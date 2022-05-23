import {
	getTypeDefDataMock,
	SchemaBreakdownMock,
} from './mocks/breakDownStrategy.mock';
import { ScalarStrategy } from '../../../../src/controller/schemaBreakdown/scalar';

describe('Breaking down enums from schema', () => {
	const strategy = new ScalarStrategy();

	test('No scalars on the schema', () => {
		const mock = new SchemaBreakdownMock().build();
		const data = getTypeDefDataMock(mock);

		const entities = strategy.getEntities(data);
		expect(entities.length).toEqual(0);
	});

	test('Scalars exists on schema', () => {
		const mock = new SchemaBreakdownMock().addScalars().build();
		const data = getTypeDefDataMock(mock);

		const entities = strategy.getEntities(data);
		expect(entities.length).toEqual(1);
	});

	test('Mixed scalars on same schema', () => {
		const mock = new SchemaBreakdownMock().addScalars().addEnums().build();
		const data = getTypeDefDataMock(mock);

		const entities = strategy.getEntities(data);
		expect(entities.length).toEqual(2);
	});
});
