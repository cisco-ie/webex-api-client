import test from 'ava';
import nock from 'nock';

import Client from '../src/client';
import mock from './mocks/create-meeting.js'

const TESTURL = 'https://test.com';

nock(TESTURL)
	.post('/', mock)
	.reply(200, 'Success');

test('Create Meeting', t => {
	const webex = new Client({
		webExID: 'testuser',
		password: 'password123',
		siteId: 'tester'
	}, TESTURL);

	webex
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
		.createMeeting()
		.then(resp => {
			console.log(resp)
		});

});

	//
	// accessControl: {
	// 	meetingPassword: '12345'
	// },
	// metaData: {
	// 	confName: 'Sample Meeting',
	// 	meetingType: 1,
	// 	agenda: 'Test'
	// },
	// participants: [
	// 	{
	// 		name: 'James Kirk',
	// 		email: 'JKirk@sz.webex.com'
	// 	}
	// ],
	// enableOptions: {
	// 	chat: true,
	// 	poll: true,
	// 	audioVideo: true
	// },
	// schedule: {
	// 	startDate: new Date(2004, 4, 31, 10, 10, 10),
	// 	openTime: 900,
	// 	joinTeleconfBeforeHost: true,
	// 	duration: 20,
	// 	timezoneID: 4
	// },
	// telephony: {
	// 	telephonySupport: 'CALLIN',
	// 	extTelephonyDescription: 'Call 1-800-555-1234, Passcode 98765'
	// }
