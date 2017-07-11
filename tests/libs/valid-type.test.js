import test from 'ava';
import validType from '../../libs/valid-type';

test('Valid Type', t => {
	const validTypes = [1, 2, 3];
	const error = t.throws(() => validType(valid, 4));
	t.is(error.message, 'Expected a valid type (1, 2, 3), received 4');
});
