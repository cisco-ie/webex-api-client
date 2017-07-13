import test from 'ava';
import nock from 'nock';

import Client from '../src/client';
import mock from './mocks/create-meeting.js'

const TESTURL = 'https://test.com';

nock('https://test.com')
	.post('/webex', '<?xml version="1.0" encoding="ISO-8859-1"?><serv:message><header><securityContext><webExID>testuser</webExID><password>password123</password><siteId>tester</siteId></securityContext></header><body><bodyContent xsi:type="java:com.webex.service.binding.meeting.CreateMeeting"><body><metaData><confName>Sample Meeting</confName><meetingType>1</meetingType><agenda>Test</agenda></metaData><participants><name>James Kirk</name><email>JKirk@sz.webex.com</email></participants><schedule><startDate>05/31/2004 10:10:10</startDate><openTime>900</openTime><joinTeleconfBeforeHost>true</joinTeleconfBeforeHost><duration>20</duration><timezoneID>4</timezoneID></schedule></body></bodyContent></body></serv:message>')
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
	} catch (e) {
		console.log(e);
	}
});
