import { ClientRepository } from '../database/client';

const { Report } = require('apollo-reporting-protobuf');
import { RegisterUsage } from './clientUsage/notRegisteredClient';
import { UpdateUsageStrategy } from './clientUsage/registeredClient';
import redisWrapper from '../redis';
import crypto from 'crypto';

export class ClientUsageController {
	private clientRepository = ClientRepository.getInstance();

	async registerUsage(buffer: Buffer) {
		const decodedReport = Report.decode(buffer).toJSON();
		const q = Object.keys(decodedReport.tracesPerQuery)[0];
		const firstQuery = decodedReport.tracesPerQuery[q];
		const trace = firstQuery.trace[0];
		if (q.includes('IntrospectionQuery')) {
			return;
		}
		const { clientName, clientVersion } = trace;

		const client = await this.clientRepository.getClientByUnique(
			clientName,
			clientVersion
		);
		const hash = crypto
			.createHash('md5')
			.update(Object.keys(decodedReport.tracesPerQuery)[0])
			.digest('hex');
		const isError = 'error' in trace.root;

		if (!client || !(await redisWrapper.get(`o_${client.id}_${hash}`))) {
			const strategy = new RegisterUsage(
				Object.keys(decodedReport.tracesPerQuery)[0],
				clientName,
				clientVersion,
				isError,
				hash
			);
			await strategy.execute();
			return;
		}

		return await new UpdateUsageStrategy(
			isError,
			client.id,
			hash
		).execute();
	}
}
