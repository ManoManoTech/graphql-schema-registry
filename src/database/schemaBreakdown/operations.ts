import Knex, { Transaction } from 'knex';
import { Operation, OperationPayload } from '../../model/operation';
import { BreakDownRepository } from './breakdown';
import {
	InputParam,
	OperationInstanceDetail,
	OutputParam,
	TypeInstance,
	TypeInstanceRepository,
} from '../../model/repository';
import { camelizeKeys } from 'humps';
import { connection } from '../index';
import { OperationType } from '../../model/enums';

export const table = 'type_def_operations';
const parametersTableName = 'type_def_operation_parameters';

interface OperationService extends TypeInstanceRepository {
	insertOperation(trx: Knex, data: OperationPayload): Promise<Operation>;
	countOperationsByType(): Promise<OperationCount[]>;
	listByType(
		type: string,
		limit: number,
		offset: number
	): Promise<TypeInstance[]>;
}

export type OperationCount = {
	name: OperationType;
	count: number;
};

const TABLE_NAME = 'type_def_operations';
const TABLE_COLUMNS = ['name', 'description', 'type', 'service_id'];

export class OperationTransactionalRepository
	extends BreakDownRepository<OperationPayload, Operation>
{
	private static instance: OperationTransactionalRepository;

	constructor() {
		super(TABLE_NAME, TABLE_COLUMNS);
	}

	static getInstance(): OperationTransactionalRepository {
		if (!OperationTransactionalRepository.instance) {
			OperationTransactionalRepository.instance =
				new OperationTransactionalRepository();
		}

		return OperationTransactionalRepository.instance;
	}

	async getOperationsByNames(trx: Transaction, data: string[]) {
		return super.get(trx, data, 'name');
	}

	async insertIgnoreOperations(trx: Transaction, data: OperationPayload[]) {
		return super.insert(trx, data);
	}

	async countOperationsByType() {
		return (await connection(table)
			.select('type')
			.count('type', { as: 'count' })
			.groupBy('type')) as OperationCount[];
	}

	async listByType(type: string, limit: number, offset: number) {
		const servicesTable = 'services';
		const res = await connection(table)
			.select()
			.join(
				servicesTable,
				`${servicesTable}.id`,
				'=',
				`${table}.service_id`
			)
			.where('type', type)
			.limit(limit)
			.offset(offset)
			.options({ nestTables: true });

		return res.map(
			(row) =>
				({
					...camelizeKeys(row[table]),
					providedBy: [camelizeKeys(row[servicesTable])],
				} as TypeInstance)
		);
	}

	async countByType(type: string) {
		const { totalItems } = (await connection(table)
			.count('type', { as: 'totalItems' })
			.where('type', type)
			.groupBy('type')
			.first()) as any;

		return totalItems as number;
	}

	async getDetails(id: number): Promise<OperationInstanceDetail> {
		const parameterTypeAlias = 'parameterType';
		const result = await connection(table).select().where('id', id).first();

		const inputParamsResult = await connection(parametersTableName)
			.select()
			.where('operation_id', id)
			.join(
				`type_def_types as ${parameterTypeAlias}`,
				`${parameterTypeAlias}.id`,
				'=',
				`${parametersTableName}.type_id`
			)
			.options({ nestTables: true });

		const details: OperationInstanceDetail = {
			...camelizeKeys(result),
			...this.mapToInputOutputParams(
				inputParamsResult,
				parameterTypeAlias
			),
		};
		return details;
	}

	private mapToInputOutputParams(
		inputParamsResult: any[],
		parameterTypeAlias: string
	) {
		const [outputParams, inputParams]: [InputParam[], OutputParam[]] =
			inputParamsResult.reduce(
				([outputs, inputs], current) => {
					const parameter = camelizeKeys(current[parametersTableName]);
					const hydratedParameter = {
						...parameter,
						key: parameter.name,
						parent: camelizeKeys(current[parameterTypeAlias]),
					};
					return parameter.isOutput
						? [[...outputs, hydratedParameter], inputs]
						: [outputs, [...inputs, hydratedParameter]];
				},
				[[], []]
			);
		return { outputParams, inputParams };
	}

	async getAll() {
		return connection(TABLE_NAME).select();
	}
}
