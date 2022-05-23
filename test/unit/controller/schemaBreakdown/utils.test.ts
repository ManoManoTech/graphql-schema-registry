import {
	createField,
	createOperationParam,
	createOperations,
	createSubgraphs,
	createTypes,
	persistEntities,
} from '../../../../src/controller/schemaBreakdown/utils';
import { Type } from '../../../../src/model/type';
import { Operation } from '../../../../src/model/operation';
import {
	DocumentNodeType,
	EntityType,
	OperationType,
} from '../../../../src/model/enums';
import { getTypeMapped, typeDefDataMock } from './mocks/breakDownStrategy.mock';
import { ITypeDefData } from '../../../../src/controller/schemaBreakdown/strategy';

describe('Help functions for the schema breakdown algorithm', () => {
	test('PersistEntities function for no entities provided', () => {
		const map = new Map();
		const subgraph = [];
		const entities = [];

		persistEntities(map, subgraph, entities);
		expect(map.size).toEqual(0);
		expect(subgraph.length).toEqual(0);
	});

	test('PersistEntities function for Type entities', () => {
		const map = new Map();
		const subgraph = [];
		const entities = [
			{
				id: 1,
				name: 'test',
				description: 'desc',
				type: EntityType.OBJECT,
			} as Type,
		];

		persistEntities(map, subgraph, entities);
		expect(map.get('test')).toEqual(1);
		expect(subgraph[0]).toEqual(1);
	});

	test('PersistEntities function for Operation entities', () => {
		const map = new Map();
		const subgraph = [];
		const entities = [
			{
				id: 1,
				name: 'test',
				description: 'desc',
				type: OperationType.QUERY,
				service_id: 1,
			} as Operation,
		];

		persistEntities(map, subgraph, entities);
		expect(map.get('test')).toEqual(1);
		expect(subgraph[0]).toEqual(1);
	});

	test('CreateTypes function for empty data', () => {
		const data = [];

		const response = createTypes(data, EntityType.OBJECT);
		expect(response.length).toEqual(0);
	});

	test('CreateTypes function for object data', () => {
		const type = 'OBJECT';
		const data = getTypeMapped(1, DocumentNodeType[type]);

		const response = createTypes(data, EntityType[type]);
		expect(response).toEqual([
			{
				name: 'Brand',
				description: undefined,
				type: type.toLowerCase(),
			},
		]);
	});

	test('CreateOperations function for empty data', () => {
		const data = [];

		const response = createOperations(data, OperationType.QUERY, 1);
		expect(response.length).toEqual(0);
	});

	test('CreateOperations function for query data', () => {
		const type = OperationType.QUERY;
		const data = getTypeMapped(1, type);

		const response = createOperations(data, type, 1);
		expect(response).toEqual([
			{
				name: 'Query',
				description: undefined,
				type: type.toLowerCase(),
				service_id: 1,
			},
		]);
	});

	test('CreateField function', () => {
		const data = getTypeMapped(1, DocumentNodeType.OBJECT);
		const parentName = 'parent';
		const dbMap = new Map();
		dbMap.set(parentName, 1);
		dbMap.set('Int', 2);

		const response = createField(data[0].fields[0], parentName, {
			dbMap,
		} as ITypeDefData);
		expect(response).toEqual({
			name: 'brandId',
			description: undefined,
			is_nullable: false,
			is_array: false,
			is_array_nullable: true,
			is_deprecated: false,
			children_type_id: 2,
			parent_type_id: 1,
		});
	});

	test('CreateOperationParam function', () => {
		const data = getTypeMapped(1, OperationType.QUERY);
		const parentName = 'parent';
		const dbMap = new Map();
		dbMap.set(parentName, 1);
		dbMap.set('_Any', 2);

		const response = createOperationParam(
			data[0].fields[0].arguments[0],
			parentName,
			false,
			{
				dbMap,
			} as ITypeDefData
		);

		expect(response).toEqual({
			operation_id: 1,
			type_id: 2,
			name: 'representations',
			description: undefined,
			is_nullable: false,
			is_array: true,
			is_array_nullable: false,
			is_output: false,
		});
	});

	test('CreateSubgraphs function for empty entities', () => {
		const response = createSubgraphs([], 1);

		expect(response.length).toEqual(0);
	});

	test('CreateSubgraphs function for multiple entities', () => {
		const response = createSubgraphs([1, 2, 3], 1);

		expect(response).toEqual([
			{
				type_id: 1,
				service_id: 1,
			},
			{
				type_id: 2,
				service_id: 1,
			},
			{
				type_id: 3,
				service_id: 1,
			},
		]);
	});
});
