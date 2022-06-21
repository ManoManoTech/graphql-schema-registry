import { ClientOperationsDTO, ExecutionsDAO } from '../../model/client_usage';
import { KeyHandler } from '../../redis/key_handler';
import { parseInputDate } from '../../graphql/resolvers/getOperationUsageTrack';
import { RedisRepository } from '../../redis/redis';
import { getTimestamp } from '../../redis/utils';
import { OperationChange } from './operation';
import { EnumChange } from './enum';
import { FieldChange } from './field';
import { TypeChange } from './type';
import { Change } from '@graphql-inspector/core';

type BreakingChangeType =
	| OperationChange
	| EnumChange
	| FieldChange
	| TypeChange;

export const getBreakingChangesTypes = (): BreakingChangeType[] => {
	return [
		new FieldChange(),
		new TypeChange(),
		new OperationChange(),
		new EnumChange(),
	];
};

export const checkUsage = async (
	operations: ClientOperationsDTO,
	usage_days: number
): Promise<number> => {
	const redisRepo = RedisRepository.getInstance();
	const keyHandler = new KeyHandler();

	const now = new Date(getTimestamp() * 1000);
	const startDate = new Date(
		getTimestamp(new Date().setDate(now.getDate() - usage_days)) * 1000
	).toString();
	const endDate = now.toString();

	const executions: Promise<ExecutionsDAO>[] = [];
	operations.forEach((_o, key) => {
		const { hash, clientId } = keyHandler.parseOperationKey(key);
		executions.push(
			redisRepo.getExecutionsFromOperation({
				clientId,
				hash,
				startSeconds: parseInputDate(startDate),
				endSeconds: parseInputDate(endDate),
			})
		);
	});
	const resultExecutions = await Promise.all(executions);
	return resultExecutions.reduce((acc, cur) => {
		return (acc += cur.total);
	}, 0);
};

export const validateBreakingChange = (
	types: string[],
	change: Change
): boolean => {
	return types.includes(change.type);
};
