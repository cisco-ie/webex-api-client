// This is applied to both fullAccessAttendees or limitedAccessAttendees
// since the logic is the same
const assert = require('assert');

module.exports = attendees => {
	assert(Array.isArray(attendees), 'Expected input to be an array ([attendee])');

	return attendees.map(attendee => {
		assert(attendee.email, 'Expected attendee to have email property defined');

		return {
			attendee
		};
	});
};
