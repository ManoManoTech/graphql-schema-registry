import { parse } from 'graphql';
import { composeServices } from '@apollo/composition';
import { composeAndValidate } from '@apollo/federation';
import { PublicError } from './error';
import { logger } from '../logger';

export function composeAndValidateSchema(servicesSchemaMap) {
	let schema;
	let errors = [];
	const serviceList = servicesSchemaMap.map((schema) => {
		const typeDefs = parse(schema.type_defs);

		return {
			name: schema.name,
			url: schema.url,
			typeDefs,
		};
	});

	try {
		({ schema, errors } = composeServices(serviceList));
	} catch (error) {
		logger.error(`Unexpected error composing V2 schema ${error.message}`);

		errors = [error];
	}

	if (errors && errors.length) {
		logger.error(
			`V2 Validation failed, trying with V1 error: ${JSON.stringify(
				errors
			)}`
		);

		try {
			({ schema, errors } = composeAndValidate(serviceList));
		} catch (error) {
			logger.error(
				`Unexpected error composing V1 schema ${error.message}`
			);

			errors = [error];
		}

		if (errors && errors.length) {
			throw new PublicError('Schema validation failed', {
				details: errors,
			});
		}
	}

	return schema;
}
