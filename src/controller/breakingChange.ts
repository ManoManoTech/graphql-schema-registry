import { Change, ChangeType, CriticalityLevel } from '@graphql-inspector/core';
import { RedisRepository } from '../redis/redis';
import { FieldTransactionRepository } from '../database/schemaBreakdown/field';
import { TypeTransactionalRepository } from '../database/schemaBreakdown/type';
import { checkUsage } from './breakingChanges/utils';
import { OperationTransactionalRepository } from '../database/schemaBreakdown/operations';
import { OperationType } from '../model/enums';

type CustomChange = Change & {
	isBreakingChange: boolean;
	totalUsages: number;
};

interface BreakingChangeService {
	validate(change: Change): boolean;
	validateUsage(
		change: Change,
		usage_days: number,
		min_usages: number
	): Promise<CustomChange>;
}

class FieldChange implements BreakingChangeService {
	private types = [ChangeType.FieldRemoved, ChangeType.FieldArgumentRemoved];

	validate(change: Change) {
		return this.types.includes(change.type);
	}

	async validateUsage(
		change: Change,
		usage_days: number,
		min_usages: number
	) {
		const redisRepo = RedisRepository.getInstance();

		const split = change.path.split('.');
		const typeName = split[split.length - 2];
		const fieldName = split[split.length - 1];

		let operations;
		if (
			typeName.toLowerCase() === OperationType.QUERY ||
			typeName.toLowerCase() === OperationType.MUTATION
		) {
			const operationRepo =
				OperationTransactionalRepository.getInstance();

			const operation = await operationRepo.getOperationByName(fieldName);
			operations = await redisRepo.getOperationsByUsage(
				operation.id,
				'operation'
			);
		} else {
			const fieldRepo = FieldTransactionRepository.getInstance();
			const typeRepo = TypeTransactionalRepository.getInstance();

			const type = await typeRepo.getTypeByName(typeName);
			const field = await fieldRepo.getFieldByNameAndParent(
				fieldName,
				type.id
			);
			operations = await redisRepo.getOperationsByUsage(
				field.id,
				'field'
			);
		}

		if (!operations) {
			return true;
		}
		const totalUsages = await checkUsage(operations, usage_days);

		return {
			...change,
			isBreakingChange: totalUsages >= min_usages,
			totalUsages,
		} as any;
	}
}

class TypeChange implements BreakingChangeService {
	private types = [ChangeType.TypeRemoved, ChangeType.DirectiveRemoved];

	validate(change) {
		return this.types.includes(change.type);
	}

	async validateUsage(
		change: Change,
		usage_days: number,
		min_usages: number
	) {
		const redisRepo = RedisRepository.getInstance();
		const typeRepo = TypeTransactionalRepository.getInstance();

		const split = change.path.split('.');

		const typeName = split[0];
		const type = await typeRepo.getTypeByName(typeName);
		const operations = await redisRepo.getOperationsByUsage(
			type.id,
			'entity'
		);

		if (!operations) {
			return true;
		}
		const totalUsages = await checkUsage(operations, usage_days);
		return {
			...change,
			isBreakingChange: totalUsages >= min_usages,
			totalUsages,
		} as any;
	}
}

class OperationChange implements BreakingChangeService {
	private types = [ChangeType.FieldTypeChanged];

	validate(change: Change) {
		return this.types.includes(change.type);
	}

	async validateUsage(
		change: Change,
		usage_days: number,
		min_usages: number
	) {
		const redisRepo = RedisRepository.getInstance();
		const operationRepo = OperationTransactionalRepository.getInstance();

		const split = change.path.split('.');
		const operationName = split[split.length - 1];

		const operation = await operationRepo.getOperationByName(operationName);
		const operations = await redisRepo.getOperationsByUsage(
			operation.id,
			'operation'
		);

		if (!operations) {
			return true;
		}
		const totalUsages = await checkUsage(operations, usage_days);
		return {
			...change,
			isBreakingChange: totalUsages >= min_usages,
			totalUsages,
		} as any;
	}
}

class EnumChange implements BreakingChangeService {
	private types = [ChangeType.EnumValueRemoved];

	validate(change: Change) {
		return this.types.includes(change.type);
	}

	async validateUsage(
		change: Change,
		usage_days: number,
		min_usages: number
	) {
		const redisRepo = RedisRepository.getInstance();

		const split = change.path.split('.');
		const enumName = split[split.length - 2];

		const fieldRepo = FieldTransactionRepository.getInstance();
		const typeRepo = TypeTransactionalRepository.getInstance();

		const type = await typeRepo.getTypeByName(enumName);
		const fields = await fieldRepo.getFieldByChildren(type.id);

		const resultOperations = await Promise.all(
			fields.map((f) => redisRepo.getOperationsByUsage(f.id, 'field'))
		);

		if (resultOperations.length === 0) {
			return true;
		}

		const resultUsages = await Promise.all(
			resultOperations.map((ro) => checkUsage(ro, usage_days))
		);

		const totalUsages = resultUsages.reduce((acc, cur) => {
			return (acc += cur);
		}, 0);

		return {
			...change,
			isBreakingChange: totalUsages >= min_usages,
			totalUsages,
		} as any;
	}
}

export class BreakingChangeHandler {
	constructor(
		private service: {
			name: string;
			version: string;
			type_defs: string;
		},
		private diff: Change[],
		private limits: {
			usage_days?: number;
			min_usages?: number;
		}
	) {}

	async handle(): Promise<CustomChange[]> {
		const breakingChanges = this.getBreakingChanges();
		if (breakingChanges.length === 0) {
			return [];
		}

		return await this.validateBreakingChangesUsages(breakingChanges);
	}

	private getBreakingChanges(): Change[] {
		return this.diff.filter(
			(change) => change.criticality.level === CriticalityLevel.Breaking
		);
	}

	private async validateBreakingChangesUsages(
		changes: Change[]
	): Promise<CustomChange[]> {
		const breakingChanges = [
			new FieldChange(),
			new TypeChange(),
			new OperationChange(),
			new EnumChange(),
		];
		const result = changes
			.map((change) => {
				const strategies = breakingChanges.filter((bc) =>
					bc.validate(change)
				);

				if (strategies.length === 0) {
					return {
						...change,
						isBreakingChange: false,
						totalUsages: 0,
					} as CustomChange;
				}

				return strategies[0].validateUsage(
					change,
					this.limits.usage_days,
					this.limits.min_usages
				);
			})
			.flat(1);
		return await Promise.all(result);
	}
}
