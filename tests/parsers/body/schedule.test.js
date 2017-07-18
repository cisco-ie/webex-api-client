import test from 'ava';
import schedule from '../../../src/parsers/body/schedule';

test('Schedule XML', t => {
	const result = schedule({
		startDate: new Date(2004, 4, 31, 10, 10, 10),
		entryExitTone: 'BEEP',
		duration: 20,
		joinTeleconfBeforeHost: true,
		openTime: 900,
		timeZoneID: 4
	});

	const expected = {
		startDate: '05/31/2004 10:10:10',
		entryExitTone: 'BEEP',
		duration: 20,
		joinTeleconfBeforeHost: true,
		openTime: 900,
		timeZoneID: 4
	};

	t.deepEqual(result, expected);
});

test('Validate entryExitTone', t => {
	const error = t.throws(() => schedule({entryExitTone: 'hi'}));
	t.is(error.message, 'Expected a valid type (BEEP, NOTONE, ANNOUNCENAME), received hi');
});
