import test from 'ava';
import nock from 'nock';

import Client from '../src/client';
import mock from './mocks/getjoinurl-meeting';

const TESTURL = 'https://test.com';

nock('https://test.com')
	.post('/webex', mock)
	.reply(200, '<Success />');

test('GetjoinurlMeeting', async t => {
	t.plan(1);

	const requestBuilder = new Client.Builder({
		webExID: 'testuser',
		password: 'password123',
		siteId: 'tester'
	}, TESTURL + '/webex');

	const getjoinurl = requestBuilder
		.sessionKey(48591508)
		.attendeeName('James Kirk')
		.setService('GetjoinurlMeeting')
		.build();

	try {
		const resp = await getjoinurl.exec();
		t.is(resp, '<Success />');
	} catch (err) {
		console.log(err);
	}
});
