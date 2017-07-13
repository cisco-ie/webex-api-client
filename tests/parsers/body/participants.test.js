import test from 'ava';
import participants from '../../../src/parsers/body/participants';

test('Participants Parser', t => {
	const parsed = participants({
		maxUserNumber: 4,
		attendees: [
			{
				name: 'James Kirk',
				email: 'Jkirk@sz.webex.com',
				joinStatus: 'REGISTER'
			},
			{
				email: 'Jdoe@sz.webex.com',
				name: 'Jane Doe',
				firstName: 'Jane',
				lastName: 'Doe',
				notes: 'Testing',
				joinStatus: 'INVITE'
			}
		]
	});

	t.deepEqual(parsed, {
		maxUserNumber: 4,
		attendees: [
			{
				attendee: {
					person: {
						name: 'James Kirk',
						email: 'Jkirk@sz.webex.com'
					},
					joinStatus: 'REGISTER'
				}
			},
			{
				attendee: {
					person: {
						email: 'Jdoe@sz.webex.com',
						name: 'Jane Doe',
						firstName: 'Jane',
						lastName: 'Doe',
						notes: 'Testing'
					},
					joinStatus: 'INVITE'
				}
			}
		]
	});
});
