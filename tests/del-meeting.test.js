import test from 'ava';
import nock from 'nock';

import Client from '../src/client';
import mock from './fixtures/delete-meeting';

const TESTURL = 'https://test.com';

nock('https://test.com')
	.post('/webex', mock)
	.reply(200, '<Success />');

test('DeleteMeeting', async t => {
	t.plan(1);

	const requestBuilder = new Client.Builder({
		webExID: 'testuser',
		password: 'password123',
		siteId: 'tester'
	}, TESTURL + '/webex');

	const deleteRequest = requestBuilder
		.meetingKey(48591508)
		.setService('DelMeeting')
		.build();

	try {
		const resp = await deleteRequest.exec();
		t.is(resp, '<Success />');
	} catch (err) {
		console.log(err);
	}
});
