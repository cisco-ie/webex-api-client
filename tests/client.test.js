import test from 'ava';
import nock from 'nock';

import Client from '../src/client';
import mock from './mocks/create-meeting';

const TESTURL = 'https://test.com';

nock('https://test.com')
	.post('/webex', mock)
	.reply(200, '<Success />');

// nock('http://localhost/path').post('').reply(200, 'hi');

test('Create Meeting', async t => {
	t.plan(1);

	const webex = new Client({
		webExID: 'testuser',
		password: 'password123',
		siteId: 'tester'
	}, TESTURL + '/webex');

	try {
		const resp = await webex
			.metaData({
				confName: 'Sample Meeting',
				meetingType: 1,
				agenda: 'Test'
			})
			.participants([
				{
					name: 'James Kirk',
					email: 'JKirk@sz.webex.com'
				}
			])
			.schedule({
				startDate: new Date(2004, 4, 31, 10, 10, 10),
				openTime: 900,
				joinTeleconfBeforeHost: true,
				duration: 20,
				timezoneID: 4
			})
			.createMeeting();

		t.is(resp, '<Success />');
	} catch (err) {
		console.log(err);
	}
});
