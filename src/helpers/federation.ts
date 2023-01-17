import { parse } from 'graphql';
import { composeServices } from '@apollo/composition';

import { PublicError } from './error';
import { logger } from '../logger';
import { createHash } from 'crypto';

const DEFAULT_SUPER_GRAPH_MIN_DELAY_SECONDS = 30;
const SUPER_GRAPH_ID_SIZE = 6;

export function composeAndValidateSchema(servicesSchemaMap) {
	let schema;
	let errors = [];

	try {
		const serviceList = servicesSchemaMap.map((schema) => {
			const typeDefs = parse(schema.type_defs);

			return {
				name: schema.name,
				url: schema.url,
				typeDefs,
			};
		});

		({ schema, errors } = composeServices(serviceList));
	} catch (error) {
		logger.error(error.message);

		errors = [error];
	}

	if (errors && errors.length) {
		logger.error(errors);
		throw new PublicError('Schema validation failed', {
			details: errors,
		});
	}

	return schema;
}

export function getSuperGraph(servicesSchemaMap): {
	id: string;
	minDelaySeconds: number;
	supergraphSdl: string;
} {
	const serviceList = servicesSchemaMap.map((schema) => {
		const typeDefs = parse(schema.type_defs);

		return {
			name: schema.name,
			url: schema.url,
			typeDefs,
		};
	});

	const { supergraphSdl } = composeServices(serviceList);

	const id = createHash('md5')
		.update(supergraphSdl)
		.digest('hex')
		.slice(0, SUPER_GRAPH_ID_SIZE);

	const minDelaySeconds = process.env.SUPER_GRAPH_MIN_DELAY_SECONDS
		? parseInt(process.env.SUPER_GRAPH_MIN_DELAY_SECONDS, 10)
		: DEFAULT_SUPER_GRAPH_MIN_DELAY_SECONDS;

	return { id, minDelaySeconds, supergraphSdl };
}
