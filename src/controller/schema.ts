import { Change, diff } from '@graphql-inspector/core';

import { transact } from '../database';
import * as federationHelper from '../helpers/federation';
import schemaModel from '../database/schema';
import Knex from 'knex';
import { BreakDownSchemaCaseUse } from './breakdown';

import { logger } from '../logger';

export async function getAndValidateSchema(
	trx,
	services = false,
	validate = true
) {
	const schemas = services
		? await schemaModel.getSchemaByServiceVersions({ trx, services })
		: await schemaModel.getLastUpdatedForActiveServices({ trx });

	logger.info(
		'Validating schema. Got services schemas from DB transaction..',
		{
			schemas,
		}
	);

	if (validate && schemas && schemas.length) {
		federationHelper.composeAndValidateSchema(schemas);
	}

	return schemas;
}

export async function pushAndValidateSchema({ service }) {
	return await transact(async (trx) => {
		const schema = await schemaModel.registerSchema({ trx, service });

		logger.info('Registered service new schema in DB transaction..', {
			schema,
		});

		await getAndValidateSchema(trx);

		const diff: Change[] = await diffSchemas({ service });

		const breakDownService = new BreakDownSchemaCaseUse(
			trx,
			service.type_defs,
			schema.service_id
		);
		if (diff !== undefined) {
			await breakDownService.applyChanges(diff);
		}
		await breakDownService.breakDown();

		return schema;
	});
}

export async function validateSchema({ service }) {
	return await transact(async (trx) => {
		const schemas = await schemaModel.getLastUpdatedForActiveServices({
			trx,
		});

		federationHelper.composeAndValidateSchema(
			schemas
				.filter((schema: any) => schema.name !== service.name)
				.concat(service)
		);
	});
}

export async function deactivateSchema({ id }) {
	return await transact(async (trx) => {
		await schemaModel.toggleSchema({ trx, id }, false);
		await getAndValidateSchema(trx);
	});
}

export async function activateSchema({ id }) {
	return await transact(async (trx) => {
		await schemaModel.toggleSchema({ trx, id }, true);
		await getAndValidateSchema(trx);
	});
}

export async function diffSchemas({ service }) {
	return await transact(async (trx) => {
		const schemas = await schemaModel.getLastUpdatedForActiveServices({
			trx,
		});

		if (schemas && schemas.length) {
			const original = federationHelper.composeAndValidateSchema(schemas);
			const updated = federationHelper.composeAndValidateSchema(
				schemas
					.filter((schema: any) => schema.name !== service.name)
					.concat(service)
			);

			return diff(
				original.toGraphQLJSSchema
					? original.toGraphQLJSSchema()
					: original,
				updated.toGraphQLJSSchema
					? updated.toGraphQLJSSchema()
					: updated
			);
		}
	});
}
