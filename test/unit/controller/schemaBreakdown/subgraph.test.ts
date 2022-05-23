import {SubgraphStrategy} from "../../../../src/controller/schemaBreakdown/subgraph";
import {getTypeDefDataMock, SchemaBreakdownMock} from "./mocks/breakDownStrategy.mock";
import {ObjectStrategy} from "../../../../src/controller/schemaBreakdown/object";

describe('Breaking down subgraphs', () => {
	const strategy = new SubgraphStrategy();

	test('Initializing getEntities', () => {
		const mock = new SchemaBreakdownMock().build();
		const data = getTypeDefDataMock(mock);

		const response = strategy.getEntities(data);
		expect(response).toEqual([]);
	});
})
