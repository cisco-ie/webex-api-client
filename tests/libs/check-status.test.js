import test from 'ava';
import checkStatus from '../../src/helpers/check-status';

test('checkStatus', t => {
	const failResp = {
		status: 404,
		statusText: 'Error out'
	};
	const err = t.throws(() => checkStatus(failResp));
	t.is(err.message, 'Error out');

	const passResp = {
		status: 200,
		body: 'Pass'
	};

	t.deepEqual(checkStatus(passResp), passResp);
});
