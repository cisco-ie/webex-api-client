import test from 'ava';
import nock from 'nock';

import Client from '../src/client';
import mock from './mocks/set-meeting';

const TESTURL = 'https://test.com';

nock('https://test.com')
	.post('/webex', mock)
	.reply(200, '<Success />');

test('SetMeeting Test', async t => {
	t.plan(1);

	const requestBuilder = new Client.Builder({
		webExID: 'testuser',
		password: 'password123',
		siteId: 'tester'
	}, TESTURL + '/webex');

	const setMeeting = requestBuilder
		.metaData({
			confName: 'SetMeeting',
			meetingType: 1,
			agenda: 'Test'
		})
		.participants({
			maxUserNumber: 4
		})
		.enableOptions({
			chat: false,
			poll: true,
			audioVideo: true
		})
		.schedule({
			startDate: new Date(2004, 5, 1, 23, 6, 27),
			duration: 60,
			timeZone: 'GMT-05:00, S. America Pacific (Bogota)',
		})
		.telephony({
			numPhoneLines: 0,
			telephonySupport: 'NONE'
		})
		.remind({
			enableReminder: true,
			emails: ['user@user.com']
		})
		.attendeeOptions({
			auto: true
		})
		.meetingKey(48591508)
		.setService('SetMeeting')
		.build();

	try {
		const resp = await setMeeting.exec();
		t.is(resp, '<Success />');
	} catch (err) {
		console.log(err);
	}
});
