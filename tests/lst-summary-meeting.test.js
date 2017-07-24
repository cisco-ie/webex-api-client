import test from 'ava';
import nock from 'nock';

import Client from '../src/client';
import mock from './mocks/lst-summary-meeting';

const TESTURL = 'https://test.com';

nock('https://test.com')
	.post('/webex', mock)
	.reply(200, '<Success />');

test('ListsummaryMeeting Test', async t => {
	t.plan(1);

	const requestBuilder = new Client.Builder({
		webExID: 'testuser',
		password: 'password123',
		siteId: 'tester'
	}, TESTURL + '/webex');

	const listSummary = requestBuilder
		.listControl({
			startFrom: 1,
			maximumNum: 10,
			listMethod: 'OR'
		})
		.order([
			{
				orderBy: 'HOSTNAME',
				orderAD: 'ASC'
			},
			{
				orderBy: 'STATUS',
				orderAD: 'ASC'
			}
		])
		.setService('LstsummaryMeeting')
		.build();

	try {
		const resp = await listSummary.exec();
		t.is(resp, '<Success />');
	} catch (err) {
		console.log(err);
	}
});
