import test from 'ava';
import accessControl from '../../../components/body/access-control';

const LONGPASSWORDMOCK = 'asjdlkasjdklaiowqdjoiqwdlkawndlkansdasdjasjdklasjdlkas';

test('Validate sessionPassword', t => {
	const error = t.throws(() => accessControl({
		sessionPassword: LONGPASSWORDMOCK
	}));

	t.is(error.message, 'Expected elements.sessionPassword to be shorter than 16 characters');
});

test('Validate audioPassword', t => {
	const error = t.throws(() => accessControl({
		audioPassword: LONGPASSWORDMOCK
	}));

	t.is(error.message, 'Expected elements.audioPassword to be shorter than 16 characters');
});

test('Access Control Test', t => {
	const validSettings = {
		sessionPassword: '1234523',
		listStatus: 'PUBLIC',
		registration: true,
		passwordReq: true,
		isRegisterIDRequired: true,
		joinStatus: '111',
		registrationStatus: 'FULL'
	};

	// Copy over valid, but add invalid settings with it
	const invalidSettings = Object.assign({}, validSettings, {joinStatus: '111'});
	const validXML = '<schedule><startDate>05/31/2004 10:10:10</startDate><entryExitTone>BEEP</entryExitTone><duration>20</duration><joinTeleconfBeforeHost>true</joinTeleconfBeforeHost><openTime>900</openTime><timeZoneID>4</timeZoneID></schedule>';
	t.is(accessControl(validSettings), validXML);

	const error = t.throws(() => accessControl(invalidSettings));
	t.is(error.message, 'Expected a valid type (REGISTER, INVITE, REJECT, ACCEPT), received 111');

	const missingReq = Object.assign({}, validSettings, {registration: ''});
	const errorReq = t.throws(() => accessControl(missingReq));
	t.is(errorReq.message, 'Missing required keys: registration');
});
