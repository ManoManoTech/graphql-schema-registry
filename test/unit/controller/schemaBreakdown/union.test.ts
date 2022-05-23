import {
	getTypeDefDataMock,
	SchemaBreakdownMock,
} from './mocks/breakDownStrategy.mock';
import { UnionStrategy } from '../../../../src/controller/schemaBreakdown/union';

describe('Breaking down enums from schema', () => {
	const strategy = new UnionStrategy();

	test('No unions on the schema', () => {
		const mock = new SchemaBreakdownMock().build();
		const data = getTypeDefDataMock(mock);

		const entities = strategy.getEntities(data);
		expect(entities.length).toEqual(0);
	});

	test('Unions exists on schema', () => {
		const mock = new SchemaBreakdownMock().addUnions().build();
		const data = getTypeDefDataMock(mock);

		const entities = strategy.getEntities(data);
		expect(entities.length).toEqual(1);
	});

	test('Mixed unions on same schema', () => {
		const mock = new SchemaBreakdownMock().addUnions().addEnums().build();
		const data = getTypeDefDataMock(mock);

		const entities = strategy.getEntities(data);
		expect(entities.length).toEqual(1);
	});
});
