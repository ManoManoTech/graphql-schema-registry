import { Change, ChangeType } from '@graphql-inspector/core';
import { RedisRepository } from '../../redis/redis';
import { TypeTransactionalRepository } from '../../database/schemaBreakdown/type';
import { checkUsage, validateBreakingChange } from './utils';
import { BreakingChangeService } from '../breakingChange';

export class TypeChange implements BreakingChangeService {
	private types = [ChangeType.TypeRemoved, ChangeType.DirectiveRemoved];

	validate(change: Change) {
		return validateBreakingChange(this.types, change);
	}

	async validateUsage(
		change: Change,
		usage_days: number = 30,
		min_usages: number = 10
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
			return {
				...change,
				isBreakingChange: false,
				totalUsages: 0,
			};
		}
		const totalUsages = await checkUsage(operations, usage_days);
		return {
			...change,
			isBreakingChange: totalUsages >= min_usages,
			totalUsages,
		};
	}
}
