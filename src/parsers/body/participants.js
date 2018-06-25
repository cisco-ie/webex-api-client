const transformAttendee = require('./partials/attendee');

module.exports = elements => {
	let elCopy = Object.assign({}, elements);

	if (elements.attendees) {
		const attendees = elements.attendees || [];
		const transformedAttendees = attendees.map(attendee => transformAttendee(attendee));

		elCopy = Object.assign({}, elCopy, {attendees: {attendee: transformedAttendees}});
	}

	return elCopy;
};
