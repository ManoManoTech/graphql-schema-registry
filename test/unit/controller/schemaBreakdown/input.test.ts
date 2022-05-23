import {
	getTypeDefDataMock,
	SchemaBreakdownMock,
} from './mocks/breakDownStrategy.mock';
import { InputStrategy } from '../../../../src/controller/schemaBreakdown/input';

describe('Breaking down enums from schema', () => {
	const strategy = new InputStrategy();

	test('No inputs on the schema', () => {
		const mock = new SchemaBreakdownMock().build();
		const data = getTypeDefDataMock(mock);

		const entities = strategy.getEntities(data);
		expect(entities.length).toEqual(0);
	});

	test('Inputs exists on schema', () => {
		const mock = new SchemaBreakdownMock().addInputs().build();
		const data = getTypeDefDataMock(mock);

		const entities = strategy.getEntities(data);
		expect(entities.length).toEqual(1);
	});

	test('Mixed inputs on same schema', () => {
		const mock = new SchemaBreakdownMock().addInputs().addEnums().build();
		const data = getTypeDefDataMock(mock);

		const entities = strategy.getEntities(data);
		expect(entities.length).toEqual(1);
	});
});
