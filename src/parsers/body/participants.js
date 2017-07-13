const pick = require('lodash.pick');

module.exports = elements => {
	let elCopy = Object.assign({}, elements);

	if (elements.attendees) {
		const attendees = elements.attendees || [];
		const transformedAttendees = attendees.map(attendee => {
			if (!attendee.email) {
				throw new Error(`Expected email property for attendee: ${JSON.stringify(attendee)}`);
			}

			// Pull out all the possible properties
			const person = pick(attendee, [
				'email', 'name', 'firstName', 'lastName', 'title', 'company',
				'webExId', 'address', 'phones', 'notes', 'url', 'type', 'sendReminder']);
			const misc = pick(attendee, ['contactID', 'joinStatus', 'role']);
			// { person }, contactID, joinStatus, role
			const newAttendee = Object.assign({}, {person}, misc);

			return {
				attendee: newAttendee
			};
		});

		elCopy = Object.assign({}, elCopy, {attendees: transformedAttendees});
	}

	return elCopy;
};
