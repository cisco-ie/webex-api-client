import test from 'ava';
import validate from '../../libs/validate';

test('Missing key throw error', t => {
	const error = t.throws(() => validate({
		hello: 'world',
		webExID: 'world2'
	}, ['universe', 'hello', 'galaxy']));
	t.is(error.message, 'Missing required keys: universe, galaxy');
});

test('Valid object', t => {
	t.is(validate({
		hello: 'world',
		webExID: 'world2',
		UnIVeRSE: 'big bang'
	}, ['universe']), null);
});
