import test from 'ava';
import toWebExTime from '../../libs/to-webex-time';

test('WebEx Time', t => {
	t.is(toWebExTime(new Date(2000, 1, 20, 12)), '02/20/2000 12:00:00');
});
