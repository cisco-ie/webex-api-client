import test from 'ava';
import nock from 'nock';

import Client from '../src/client';
import mock from './fixtures/create-meeting';

const TESTURL = 'https://test.com';

nock('https://test.com')
	.post('/webex', mock)
	.reply(200, '<Success />');

test('Create Meeting', async t => {
	t.plan(1);

	const requestBuilder = new Client.Builder({
		webExID: 'testuser',
		password: 'password123',
		siteId: 'tester'
	}, TESTURL + '/webex');

	const webExMeeting = requestBuilder
		.metaData({
			confName: 'Sample Meeting',
			meetingType: 1,
			agenda: 'Test'
		})
		.participants({
			maxUserNumber: 4,
			attendees: [
				{
					name: 'James Kirk',
					email: 'JKirk@sz.webex.com'
				}
			]
		})
		.schedule({
			startDate: new Date(2004, 4, 31, 10, 10, 10),
			openTime: 900,
			joinTeleconfBeforeHost: true,
			duration: 20,
			timezoneID: 4
		})
		.remind({
			emails: ['test@test.com', 'test2@test.com'],
			sendEmail: true
		})
		.tracking(['trackSig1', 'trackSig3'])
		.assistService({
			assistRequest: 'Live Event Support'
		})
		.setEncoding('ISO-8859-1')
		.setService('CreateMeeting')
		.build();

	try {
		const resp = await webExMeeting.exec();

		t.is(resp, '<Success />');
	} catch (err) {
		console.log(err);
	}
});
