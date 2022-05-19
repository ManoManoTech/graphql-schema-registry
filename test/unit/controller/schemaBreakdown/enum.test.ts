import {
	getTypeDefDataMock,
	SchemaBreakdownMock,
} from './mocks/breakDownStrategy.mock';
import { EnumStrategy } from '../../../../src/controller/schemaBreakdown/enum';

describe('Breaking down enums from schema', () => {
	const strategy = new EnumStrategy();

	test('No enums on the schema', () => {
		const mock = new SchemaBreakdownMock().build();
		const data = getTypeDefDataMock(mock);

		const entities = strategy.getEntities(data);
		expect(entities.length).toEqual(0);
	});

	test('Enums exists on schema', () => {
		const mock = new SchemaBreakdownMock().addEnums().build();
		const data = getTypeDefDataMock(mock);

		const entities = strategy.getEntities(data);
		expect(entities.length).toEqual(1);
	});

	test('Mixed enums on same schema', () => {
		const mock = new SchemaBreakdownMock()
			.addDirectives()
			.addEnums()
			.build();
		const data = getTypeDefDataMock(mock);

		const entities = strategy.getEntities(data);
		expect(entities.length).toEqual(1);
	});
});
