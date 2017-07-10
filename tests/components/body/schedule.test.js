import test from 'ava';
import schedule from '../../../components/body/schedule';

test('Schedule XML', t => {
	const validSchedule = '<schedule><startDate>05/31/2004 10:10:10</startDate><entryExitTone>BEEP</entryExitTone><duration>20</duration><joinTeleconfBeforeHost>true</joinTeleconfBeforeHost><openTime>900</openTime><timeZoneID>4</timeZoneID></schedule>';
	const scheduleXML = schedule({
		startDate: new Date(2004, 4, 31, 10, 10, 10),
		entryExitTone: 'BEEP',
		duration: 20,
		joinTeleconfBeforeHost: true,
		openTime: 900,
		timeZoneID: 4
	});

	t.is(scheduleXML, validSchedule);
});

test('Entry Exit Tone Error', t => {
	const scheduleError = t.throws(() => schedule({
		startDate: new Date(2004, 4, 31, 10, 10, 10),
		entryExitTone: '1'
	}));

	t.is(scheduleError.message, 'Invalid entryExitTone, expected [BEEP, NOTONE, ANNOUNCENAME]');
});
