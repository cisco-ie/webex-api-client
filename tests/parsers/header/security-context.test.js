import test from 'ava';
import securityContext from '../../../src/parsers/header/security-context';

test('Ensure sitename/siteid and email/webexid checks', t => {
	const errorSite = t.throws(() => securityContext({
		nothing: 'here'
	}));
	t.is(errorSite.message, 'Missing required keys: siteName or siteID');

	const errorUser = t.throws(() => securityContext({
		siteID: 'tester'
	}));
	t.is(errorUser.message, 'Missing required keys: email or webExID');

	const errorCreds = t.throws(() => securityContext({
		siteID: 'tester',
		email: 'test@test.com'
	}));
	t.is(errorCreds.message, 'Missing required keys: password or sessionTicket');
});
