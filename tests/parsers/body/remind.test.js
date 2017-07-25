import test from 'ava';
import remind from '../../../src/parsers/body/remind';

test('Remind Parser', t => {
	const result = remind({
		emails: [
			'test@test.com',
			'test1@test.com'
		],
		sendEmail: true
	});
	t.deepEqual(result, {
		emails: {
			email: [
				'test@test.com',
				'test1@test.com'
			]
		},
		sendEmail: true
	});

	// No emails should return same elements
	const element = {
		sendEmail: true
	};
	t.deepEqual(remind(element), element);
});
