import request from 'request-promise';
import { reset, connect, disconnect } from '../db';

beforeEach(async () => {
	await reset();
});
beforeAll(async () => {
	await connect();
});

afterAll(async () => {
	await disconnect();
});
describe('POST /schema/diff', function () {
	it('new service & new field was added', async () => {
		let result = await request({
			method: 'POST',
			uri: 'http://localhost:6001/schema/push',
			resolveWithFullResponse: true,
			json: true,
			body: {
				name: 'service_a',
				version: 'v1',
				type_defs: `type Query {
					hello: String
				}`,
			},
		});

		expect(result.statusCode).toBe(200);

		result = await request({
			method: 'POST',
			uri: 'http://localhost:6001/schema/diff',
			resolveWithFullResponse: true,
			json: true,
			body: {
				name: 'service_b',
				version: 'v1',
				type_defs: `type Query {
					privet: String
				}`,
			},
		});

		expect(result.statusCode).toBe(200);

		expect(result.body).toEqual({
			data: [],
			success: true,
		});
	});
	it('field was removed', async () => {
		let result = await request({
			method: 'POST',
			uri: 'http://localhost:6001/schema/push',
			resolveWithFullResponse: true,
			json: true,
			body: {
				name: 'service_a',
				version: 'v1',
				type_defs: `type Query {
					hello: String
					world: String
				}`,
			},
		});

		expect(result.statusCode).toBe(200);

		result = await request({
			method: 'POST',
			uri: 'http://localhost:6001/schema/diff',
			resolveWithFullResponse: true,
			json: true,
			body: {
				name: 'service_a',
				version: 'v2',
				type_defs: `type Query {
					hello: String
				}`,
			},
		});

		expect(result.statusCode).toBe(200);

		expect(result.body).toEqual({
			data: [
				{
					criticality: {
						level: 'BREAKING',
						reason: 'Removing a field is a breaking change. It is preferable to deprecate the field before removing it.',
					},
					message:
						"Field 'world' was removed from object type 'Query'",
					path: 'Query.world',
					type: 'FIELD_REMOVED',
					isBreakingChange: false,
					totalUsages: 0,
				},
			],
			success: true,
		});
	});
});
