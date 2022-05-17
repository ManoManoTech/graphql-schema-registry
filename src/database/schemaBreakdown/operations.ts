import Knex, { Transaction } from 'knex';
import { Operation, OperationPayload } from '../../model/operation';
import { BreakDownRepository } from './breakdown';
import { camelizeKeys } from 'humps';
import { connection } from '../index';
import { OperationType } from '../../model/enums';
import {
	TypeInstance,
	TypeInstanceDetail,
	TypeInstanceRepository,
} from '../../model/repository';

const table = 'type_def_operations';

interface OperationService extends TypeInstanceRepository {
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
	implements OperationService
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

	getDetails(id: number): Promise<TypeInstanceDetail> {
		throw new Error('Method not implemented.');
	}
}
