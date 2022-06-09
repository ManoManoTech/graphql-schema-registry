import { getTimestamp } from '../../redis/utils';

import redisWrapper from '../../redis';

export class UpdateUsageStrategy {
	constructor(
		private isError: boolean,
		private clientId: number,
		private hash: string
	) {}

	async execute(totalQueries: number = 1) {
		const key = `${this.clientId}_${this.hash}_${getTimestamp()}`;
		await redisWrapper.incr(
			`${this.isError ? 'e' : 's'}_${key}`,
			totalQueries
		);
	}
}
