import test from 'ava';
import Client from '../src/client';

const TESTURL = 'https://test.com';

test('Client toBuilder method', async t => {
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
		.meetingKey(123456)
		.setService('CreateMeeting')
		.build();

	const delMeetingBuilder = webExMeeting.toBuilder();
	const delMeeting = delMeetingBuilder.setService('DelMeeting').build();

	t.is(delMeeting.payload, '<?xml version="1.0" encoding="UTF-8"?><serv:message xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><header><securityContext><webExID>testuser</webExID><password>password123</password><siteId>tester</siteId></securityContext></header><body><bodyContent xsi:type="java:com.webex.service.binding.meeting.DelMeeting"><metaData><confName>Sample Meeting</confName><meetingType>1</meetingType><agenda>Test</agenda></metaData><meetingKey>123456</meetingKey></bodyContent></body></serv:message>');
});

test('Client newBuilder method', async t => {
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
		.meetingKey(123456)
		.setService('DelMeeting')
		.build();

	const newMeeting = webExMeeting
		.newBuilder()
		.metaData({
			confName: 'Sample Meeting 2'
		})
		.setService('CreateMeeting')
		.build();

	// It should clear out the old elements and only contain the new metaData
	t.is(newMeeting.payload, '<?xml version="1.0" encoding="UTF-8"?><serv:message xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><header><securityContext><webExID>testuser</webExID><password>password123</password><siteId>tester</siteId></securityContext></header><body><bodyContent xsi:type="java:com.webex.service.binding.meeting.CreateMeeting"><metaData><confName>Sample Meeting 2</confName></metaData></bodyContent></body></serv:message>');
});
