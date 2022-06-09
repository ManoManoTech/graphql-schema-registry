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
		const firstQuery =
			decodedReport.tracesPerQuery[
				Object.keys(decodedReport.tracesPerQuery)[0]
			];

		const { clientName, clientVersion } = firstQuery.trace[0];
		const clients: any = firstQuery.trace.reduce((acc, cur) => {
			const key = `${cur.clientName}-${cur.clientVersion}`;
			if (acc[key]) {
				const current = acc[key];
				++current.total;
				acc[key] = current;
			} else {
				acc[key] = {
					total: 1,
					clientName: cur.clientName,
					clientVersion: cur.clientVersion,
				};
			}
			return acc;
		}, {});

		const promises = Object.values(clients).map((client: any) => {
			return this.clientRepository.getClientByUnique(
				client.clientName,
				client.clientVersion
			);
		});

		const dbClients = await Promise.all(promises);

		const client = await this.clientRepository.getClientByUnique(
			clientName,
			clientVersion
		);
		const hash = crypto
			.createHash('md5')
			.update(Object.keys(decodedReport.tracesPerQuery)[0])
			.digest('hex');
		const isError = 'error' in firstQuery.trace[0].root;
		const totalQueries = firstQuery.trace.length;
		if (!client || !(await redisWrapper.get(`o_${client.id}_${hash}`))) {
			const strategy = new RegisterUsage(
				Object.keys(decodedReport.tracesPerQuery)[0],
				clientName,
				clientVersion,
				isError,
				hash
			);
			await strategy.execute(totalQueries);
			return;
		}

		return await new UpdateUsageStrategy(isError, client.id, hash).execute(
			totalQueries
		);
	}
}
