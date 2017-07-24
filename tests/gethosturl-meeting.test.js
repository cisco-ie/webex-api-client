import test from 'ava';
import nock from 'nock';

import Client from '../src/client';
import mock from './mocks/gethosturl-meeting';

const TESTURL = 'https://test.com';

nock('https://test.com')
	.post('/webex', mock)
	.reply(200, '<Success />');

test('GethosturlMeeting', async t => {
	t.plan(1);

	const requestBuilder = new Client.Builder({
		webExID: 'testuser',
		password: 'password123',
		siteId: 'tester'
	}, TESTURL + '/webex');

	const gethosturl = requestBuilder
		.sessionKey(48591508)
		.setService('GethosturlMeeting')
		.build();

	try {
		const resp = await gethosturl.exec();
		t.is(resp, '<Success />');
	} catch (err) {
		console.log(err);
	}
});
