import {
	getTypeDefDataMock,
	SchemaBreakdownMock,
} from './mocks/breakDownStrategy.mock';
import {ObjectStrategy} from "../../../../src/controller/schemaBreakdown/object";

describe('Breaking down enums from schema', () => {
	const strategy = new ObjectStrategy();

	test('No objects on the schema', () => {
		const mock = new SchemaBreakdownMock().build();
		const data = getTypeDefDataMock(mock);

		const entities = strategy.getEntities(data);
		expect(entities.length).toEqual(0);
	});

	test('Objects exists on schema', () => {
		const mock = new SchemaBreakdownMock().addObjects().build();
		const data = getTypeDefDataMock(mock);

		const entities = strategy.getEntities(data);
		expect(entities.length).toEqual(3);
	});

	test('Mixed objects on same schema', () => {
		const mock = new SchemaBreakdownMock().addObjects().addEnums().build();
		const data = getTypeDefDataMock(mock);

		const entities = strategy.getEntities(data);
		expect(entities.length).toEqual(3);
	});
});
