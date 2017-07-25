import test from 'ava';
import nock from 'nock';

import Client from '../src/client';
import mock from './fixtures/get-teleconference-session';

const TESTURL = 'https://test.com';

nock('https://test.com')
	.post('/webex', mock)
	.reply(200, '<Success />');

test('GetTeleconferenceSession Test', async t => {
	t.plan(1);

	const requestBuilder = new Client.Builder({
		webExID: 'testuser',
		password: 'password123',
		siteId: 'tester'
	}, TESTURL + '/webex');

	const getTeleconf = requestBuilder
		.sessionKey(37480497)
		.setService('GetTeleconferenceSession')
		.build();

	try {
		const resp = await getTeleconf.exec();
		t.is(resp, '<Success />');
	} catch (err) {
		console.log(err);
	}
});
