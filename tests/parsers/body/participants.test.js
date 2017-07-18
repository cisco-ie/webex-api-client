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

test('Validate joinStatus', t => {
	const error = t.throws(() => participants({
		attendees: [
			{
				email: 'cool@beans.com',
				joinStatus: 'coolbeans'
			}
		]
	}));
	t.is(error.message, 'Expected a valid type (REGISTER, INVITE, REJECT, ACCEPT), received coolbeans');
});

test('Validate role', t => {
	const error = t.throws(() => participants({
		attendees: [
			{
				email: 'cool@beans.com',
				role: 'governer'
			}
		]
	}));
	t.is(error.message, 'Expected a valid type (ATTENDEE, PRESENTER, HOST, LIMITED), received governer');
});

test('Validate email', t => {
	const error = t.throws(() => participants({
		attendees: [
			{
				role: 'governer'
			}
		]
	}));
	t.is(error.message, 'Expected email property for attendee: {\"role\":\"governer\"}'); // eslint-disable-line no-useless-escape
});

test('Validate personType', t => {
	const error = t.throws(() => participants({
		attendees: [
			{
				email: 'cool@beans.com',
				type: 'universe'
			}
		]
	}));
	t.is(error.message, 'Expected a valid type (VISITOR, MEMBER, PANELIST, SME, SALESTEAM), received universe');
});
