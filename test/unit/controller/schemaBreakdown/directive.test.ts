import {getTypeDefDataMock, SchemaBreakdownMock} from "./mocks/breakDownStrategy.mock";
import {DirectiveStrategy} from "../../../../src/controller/schemaBreakdown/directive";

describe('Breaking down directives from schema', () => {
	const strategy = new DirectiveStrategy();

	test('No directives on the schema', () => {
		const mock = new SchemaBreakdownMock()
			.build();
		const data = getTypeDefDataMock(mock);

		const entities = strategy.getEntities(data);
		expect(entities.length).toEqual(0);
	})

	test('Directive exists on schema', () => {
		const mock = new SchemaBreakdownMock()
			.addDirectives()
			.build();
		const data = getTypeDefDataMock(mock);

		const entities = strategy.getEntities(data);
		expect(entities.length).toEqual(1);
	});

	test('Mixed directives on same schema', () => {
		const mock = new SchemaBreakdownMock()
			.addDirectives()
			.addEnums()
			.build();
		const data = getTypeDefDataMock(mock);

		const entities = strategy.getEntities(data);
		expect(entities.length).toEqual(1);
	})
})

