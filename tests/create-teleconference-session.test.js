import test from 'ava';
import nock from 'nock';

import Client from '../src/client';
import mock from './mocks/create-teleconference-session';

const TESTURL = 'https://test.com';

nock('https://test.com')
	.post('/webex', mock)
	.reply(200, '<Success />');

test('Create Teleconference Session', async t => {
	t.plan(1);

	const requestBuilder = new Client.Builder({
		webExID: 'testuser',
		password: 'password123',
		siteId: 'tester'
	}, TESTURL + '/webex');

	const createTeleconferenceSession = requestBuilder
		.accessControl({
			listStatus: 'PUBLIC',
			sessionPassword: 123456,
			registration: true
		})
		.metaData({
			confName: 'Sample Teleconference-only meeting'
		})
		.fullAccessAttendees([
			{
				name: 1,
				email: '1@1.com'
			}
		])
		.limitedAccessAttendees([
			{
				name: 2,
				email: '2@2.com'
			}
		])
		.schedule({
			startDate: new Date(2005, 3, 18, 15, 8, 51),
			timeZoneID: 45,
			entryExitTone: 'ANNOUNCENAME'
		})
		.teleconference({
			extTelephonyDescription: 'xml'
		})
		.tracking([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
		.repeat({
			repeatType: 'DAILY',
			interval: 1
		})
		.attendeeOptions({
			emailInvitations: true
		})
		.setService('CreateTeleconferenceSession')
		.build();

	try {
		const resp = await createTeleconferenceSession.exec();
		t.is(resp, '<Success />');
	} catch (err) {
		console.log(err);
	}
});
