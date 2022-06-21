import { Change, ChangeType } from '@graphql-inspector/core';
import { RedisRepository } from '../../redis/redis';
import { OperationTransactionalRepository } from '../../database/schemaBreakdown/operations';
import { checkUsage, validateBreakingChange } from './utils';
import { BreakingChangeService } from '../breakingChange';

export class OperationChange implements BreakingChangeService {
	private types = [ChangeType.FieldTypeChanged];

	validate(change: Change) {
		return validateBreakingChange(this.types, change);
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
