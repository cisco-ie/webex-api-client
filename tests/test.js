import test from 'ava';
import securityContext from '../securityContext';

test('Security Context', t => {
	const testAttributes = {
				siteName: 'Aishu',
				webExID: 12345,
				password: 'pass',
				partnerID: 'partnerID',
				email: 'test@test.com'
	};

	const result = securityContext(testAttributes);
	const expected = '<securityContext><siteName>Aishu</siteName><webExID>12345</webExID><password>pass</password><partnerID>partnerID</partnerID><email>test@test.com</email></securityContext>';
	t.is(result, expected);
});
