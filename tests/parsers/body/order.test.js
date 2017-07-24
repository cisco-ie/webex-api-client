import test from 'ava';
import order from '../../../src/parsers/body/order';

test('Order Parser', t => {
	const result = order([
		{
			orderBy: 'STATUS',
			orderAD: 'ASC'
		},
		{
			orderBy: 'HOSTNAME',
			orderAD: 'DESC'
		}
	]);

	t.deepEqual(result, {
		orderBy: ['STATUS', 'HOSTNAME'],
		orderAD: ['ASC', 'DESC']
	});

	const err = t.throws(() => order([{orderBy: 'z'}]));
	t.is(err.message, 'Expected a valid type (HOSTNAME, STATUS), received z');

	const err2 = t.throws(() => order([{orderAD: 'a'}]));
	t.is(err2.message, 'Expected a valid type (ASC, DESC), received a');

	const err3 = t.throws(() => order('hello'));
	t.is(err3.message, 'Expected order to receive an array ([ {orderBy, orderAD}, {orderBy, orderAD} ])');
});
