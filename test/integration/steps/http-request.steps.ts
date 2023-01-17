import { When, Then, Given } from '@cucumber/cucumber';
import fetch from 'node-fetch';
let response: any;
import expect from 'expect';
import crypto from 'crypto';
import { UpdateUsageStrategy } from '../../../src/controller/clientUsage/registeredClient';
import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(20 * 1000);

When(
	'I send a {string} request to {string}',
	async (op: string, url: string) => {
		response = await fetch(`http://localhost:3000${url}`, {
			method: op,
		});
	}
);

When(
	'I send a {string} request to {string} with body:',
	async (op: string, url: string, body: string) => {
		response = await fetch(`http://localhost:3000${url}`, {
			method: op,
			body: body,
			headers: { 'Content-Type': 'application/json' },
		});
	}
);

When(
	'I send a "POST" request to {string} with body and forcing header:',
	async (url: string, body: string) => {
		response = await fetch(`http://localhost:3000${url}`, {
			method: 'POST',
			body: body,
			headers: {
				'Content-Type': 'application/json',
				'Force-Push': 'true',
			},
		});
	}
);

When(
	'I send a {string} request to {string} with header {string} set to {string}',
	async (
		method: string,
		url: string,
		headerName: string,
		headerValue: string
	) => {
		response = await fetch(`http://localhost:3000${url}`, {
			method,
			headers: { [headerName]: headerValue },
		});
	}
);

Given(
	'a not registered client {string} and version {string} for an {string} query:',
	async (
		clientName: string,
		clientVersion: string,
		isError: string,
		query: string
	) => {
		const { RegisterUsage } = await import(
			'../../../src/controller/clientUsage/notRegisteredClient'
		);
		const hash = crypto.createHash('md5').update(query).digest('hex');
		const strategy = new RegisterUsage(
			query,
			{
				id: 1,
				name: clientName,
				version: clientVersion,
			},
			{
				errors: Number(isError === 'invalid'),
				success: Number(isError !== 'invalid'),
			},
			hash
		);
		await strategy.execute();
	}
);

Given(
	'a registered client {int} for an {string} query:',
	async (clientId: number, isError: string, query: string) => {
		const { UpdateUsageStrategy } = await import(
			'../../../src/controller/clientUsage/registeredClient'
		);
		const hash = crypto.createHash('md5').update(query).digest('hex');
		const strategy = new UpdateUsageStrategy(
			{
				errors: Number(isError === 'invalid'),
				success: Number(isError !== 'invalid'),
			},
			clientId,
			hash
		);
		await strategy.execute();
	}
);

Then('the response status code should be {int}', async (status: number) => {
	expect(response?.status).toEqual(status);
});

Then('the response should be in JSON and contain:', async (json) => {
	const responseBody = await response.json();
	const subObj = JSON.parse(json);
	if (responseBody.data?.added_time) {
		if (!subObj.data?.added_time) {
			subObj.data = {
				added_time: responseBody.data?.added_time,
				...subObj.data,
			};
		}
	}
	expect(responseBody).toMatchObject(subObj);
});
