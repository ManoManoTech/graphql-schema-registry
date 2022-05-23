import {
	getTypeDefDataMock,
	SchemaBreakdownMock,
} from './mocks/breakDownStrategy.mock';
import {InterfaceStrategy} from "../../../../src/controller/schemaBreakdown/interface";

describe('Breaking down enums from schema', () => {
	const strategy = new InterfaceStrategy();

	test('No interfaces on the schema', () => {
		const mock = new SchemaBreakdownMock().build();
		const data = getTypeDefDataMock(mock);

		const entities = strategy.getEntities(data);
		expect(entities.length).toEqual(0);
	});

	test('Interfaces exists on schema', () => {
		const mock = new SchemaBreakdownMock().addInterfaces().build();
		const data = getTypeDefDataMock(mock);

		const entities = strategy.getEntities(data);
		expect(entities.length).toEqual(1);
	});

	test('Mixed interfaces on same schema', () => {
		const mock = new SchemaBreakdownMock().addInterfaces().addEnums().build();
		const data = getTypeDefDataMock(mock);

		const entities = strategy.getEntities(data);
		expect(entities.length).toEqual(1);
	});
});
