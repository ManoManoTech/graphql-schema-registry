import { Type, TypePayload } from '../../model/type';
import { Transaction } from 'knex';
import { BreakDownRepository } from './breakdown';
import {
	TypeInstance,
	TypeInstanceDetail,
	TypeInstanceRepository,
} from '../../model/repository';
import { EntityType } from '../../model/enums';
import { connection } from '..';
import { servicesTable } from '../services';
import { camelizeKeys } from 'humps';
import { Service } from '../../model/service';

const TABLE_NAME = 'type_def_types';
const TABLE_COLUMNS = [
	'name',
	'description',
	'type'
];

interface TypeService extends TypeInstanceRepository {
	getTypesByNames(trx: Transaction, typeNames: string[]): Promise<Type[]>;
	insertIgnoreTypes(trx: Transaction, data: TypePayload[]): Promise<void>;
	countTypesByType(): Promise<TypeCount[]>;
}

export type TypeCount = {
	name: EntityType;
	count: number;
};
export class TypeTransactionalRepository
	extends BreakDownRepository<TypePayload, Type>
	implements TypeService
{
	// private tableName = 'type_def_types';
	private static instance: TypeTransactionalRepository;

	constructor() {
		super(TABLE_NAME, TABLE_COLUMNS);
	}

	static getInstance(): TypeTransactionalRepository {
		if (!TypeTransactionalRepository.instance) {
			TypeTransactionalRepository.instance = new TypeTransactionalRepository();
		}

		return TypeTransactionalRepository.instance;
	}

	async getTypeByName(trx: Transaction, name: string) {
		return trx(TABLE_NAME)
			.select()
			.where('name', name);
	}

	async getTypesByNames(trx: Transaction, data: string[]) {
		return super.get(trx, data, 'name')
	}

	async insertIgnoreTypes(trx: Transaction, data: TypePayload[]): Promise<void> {
		return super.insert(trx, data)
	}

	async removeTypes(trx: Transaction, data: string[]) {
		return super.remove(trx, data, 'name')
	}

	async removeTypesByService(trx: Transaction) {
		return trx
			.raw(`
				DELETE t
				FROM type_def_types t
				LEFT JOIN type_def_subgraphs tds on t.id = tds.type_id
				WHERE tds.service_id IS NULL;
			`);
	}

	async countTypesByType() {
		return (await connection(TABLE_NAME)
			.select('type')
			.count('type', { as: 'count' })
			.groupBy('type')) as TypeCount[];
	}

	async listByType(type: string, limit: number, offset: number) {
		const servicesRelationTable = 'type_def_subgraphs';
		const paginatedTypesAlias = 't';
		const typesData = connection(TABLE_NAME)
			.select()
			.where('type', type)
			.limit(limit)
			.offset(offset)
			.as(paginatedTypesAlias);
		const typeInstancesRawData = await connection()
			.select()
			.from(typesData)
			.join(
				servicesRelationTable,
				`${servicesRelationTable}.type_id`,
				'=',
				`${paginatedTypesAlias}.id`
			)
			.join(
				servicesTable,
				`${servicesTable}.id`,
				'=',
				`${servicesRelationTable}.service_id`
			)
			.options({ nestTables: true });

		return this.mapToTypeInstances(
			typeInstancesRawData,
			paginatedTypesAlias
		);
	}

	private mapToTypeInstances(rawData: any[], typeAlias: string) {
		const typeMap = new Map<number, TypeInstance>();
		rawData.forEach((row) => {
			const typeId = row[typeAlias].id;
			if (typeMap.has(typeId)) {
				this.addProvidedByService(
					typeMap,
					typeId,
					camelizeKeys(row[servicesTable]) as Service
				);
			} else {
				typeMap.set(typeId, this.mapToTypeInstance(row, typeAlias));
			}
		});
		return Array.from(typeMap.values());
	}

	private addProvidedByService(
		typeMap: Map<number, TypeInstance>,
		typeId: number,
		service: Service
	) {
		typeMap.get(typeId).providedBy.push(camelizeKeys(service));
	}

	private mapToTypeInstance(
		typeRawData: any,
		typeAlias: string
	): TypeInstance {
		return {
			...typeRawData[typeAlias],
			providedBy: [camelizeKeys(typeRawData[servicesTable])],
		};
	}

	async countByType(type: string) {
		const { totalItems } = (await connection(TABLE_NAME)
			.count('type', { as: 'totalItems' })
			.where('type', type)
			.groupBy('type')
			.first()) as any;

		return totalItems as number;
	}

	async getDetails(id: number): Promise<TypeInstanceDetail> {
		// const fieldTypeNameAlias = 'ftn';
		// const fieldTypeAlias = 'ft';
		// const result = await connection(TABLE_NAME)
		// 	.select()
		// 	.where(`${TABLE_NAME}.id`, id)
		// 	// fields
		// 	.leftJoin(`${FieldTransactionRepository.tableName} as ${fieldTypeNameAlias}`, `${fieldTypeNameAlias}.parent_type_id`, '=', `${TABLE_NAME}.id`)
		// 	.leftJoin(`${TABLE_NAME} as ${fieldTypeAlias}`, `${fieldTypeNameAlias}.children_type_id`, '=', `${fieldTypeAlias}.id`)
		// 	 // inputParams

		// 	// outputParams
		// 	// usedBy
		// 	// implementations
		// 	.options({ nestTables: true })
		throw new Error('Not implemented');
	}
}
