import test from 'ava';
import accessControl from '../../../src/parsers/body/access-control';

const LONGPASSWORDMOCK = 'asjdlkasjdklaiowqdjoiqwdlkawndlkansdasdjasjdklasjdlkas';

const validSettings = {
	sessionPassword: '1234523',
	listStatus: 'PUBLIC',
	registration: true,
	passwordReq: true,
	isRegisterIDRequired: true,
	registrationStatus: 'FULL'
};

test('Validate sessionPassword', t => {
	const error = t.throws(() => accessControl({
		registration: true,
		sessionPassword: LONGPASSWORDMOCK
	}));

	t.is(error.message, 'Expected elements.sessionPassword to be shorter than 16 characters');
});

test('Validate audioPassword', t => {
	const error = t.throws(() => accessControl({
		registration: true,
		audioPassword: LONGPASSWORDMOCK
	}));

	t.is(error.message, 'Expected elements.audioPassword to be shorter than 16 characters');
});

test('Validate join status', t => {
	// Additional Error Checks
	const invalidSettings = Object.assign({}, validSettings, {joinStatus: '111'});
	const error = t.throws(() => accessControl(invalidSettings));
	t.is(error.message, 'Expected a valid type (REGISTER, INVITE, REJECT, ACCEPT), received 111');

	const errorReq = t.throws(() => accessControl({}));
	t.is(errorReq.message, 'Missing required keys: registration in accessControl');
});

test('Validate required keys', t => {
	const errorReq = t.throws(() => accessControl({}));
	t.is(errorReq.message, 'Missing required keys: registration in accessControl');
});
