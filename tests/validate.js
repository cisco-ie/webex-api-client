import test from 'ava';
import validate from '../libs/validate';

test('Valid throw error', t => {
  const error = t.throws(() => validate({
    hello: 'world',
    webExID: 'world2'
  }, ['universe']));
  t.is(error.message, 'Missing required keys: universe');
});
