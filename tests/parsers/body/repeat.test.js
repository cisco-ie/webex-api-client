import test from 'ava';
import repeat from '../../../src/parsers/body/repeat';

test('Repeat Parser', t => {
	const result = repeat({
		dayInWeek: ['MONDAY', 'TUESDAY'],
		interval: 4,
		expirationDate: new Date(2017, 0, 31)
	});
	t.deepEqual(result, {
		expirationDate: '01/31/2017 00:00:00',
		interval: 4,
		dayInWeek: {
			day: ['MONDAY', 'TUESDAY']
		}
	});
});

test('Validate repeatType', t => {
	const err = t.throws(() => repeat({
		repeatType: 'Hello world'
	}));

	t.is(err.message, 'Expected a valid type (WEEKLY, DAILY, NO_REPEAT, CONSTANT, MONTHLY, YEARLY), received Hello world');
});
