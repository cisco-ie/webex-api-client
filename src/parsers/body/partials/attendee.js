// Unsure why eslint is not recogonizing this dep, ignoring rule for now
const pick = require('lodash.pick'); // eslint-disable-line import/no-extraneous-dependencies
const validType = require('../../../helpers/valid-type');
const ENUMS = require('../../../constants/enum-types');

const ROLES = ENUMS.role;
const PERSONTYPES = ENUMS.personType;
const JOINSTATUSES = ENUMS.joinStatus;

module.exports = attendee => {
	if (!attendee.email) {
		throw new Error(`Expected email property for attendee: ${JSON.stringify(attendee)}`);
	}

	// Pull out all the possible properties
	const person = pick(attendee, [
		'email', 'name', 'firstName', 'lastName', 'title', 'company',
		'webExId', 'address', 'phones', 'notes', 'url', 'type', 'sendReminder']);

	if (person.type) {
		validType(PERSONTYPES, person.type);
	}

	const misc = pick(attendee, ['contactID', 'joinStatus', 'role']);

	if (misc.role) {
		validType(ROLES, misc.role);
	}

	if (misc.joinStatus) {
		validType(JOINSTATUSES, misc.joinStatus);
	}
	// { person }, contactID, joinStatus, role
	return Object.assign({}, {person}, misc);
};
