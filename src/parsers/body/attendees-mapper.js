// This is applied to both fullAccessAttendees or limitedAccessAttendees
// since the logic is the same
const assert = require('assert');
const transformAttendee = require('./partials/attendee');

module.exports = attendees => {
	assert(Array.isArray(attendees), 'Expected input to be an array ([attendee])');

	return attendees.map(attendee => {
			return {
				attendee: transformAttendee(attendee)
			};
	});
};
