// Per Schema all elements are optional
const validType = require('../../helpers/valid-type');
const validate = require('../../helpers/validate');
const ENUMS = require('../../constants/enum-types');
const LISTSTATUS = ENUMS['listStatus'];
const JOINSTATUS = ENUMS['joinStatus'];
const REGSTATUS = ENUMS['registrationStatus'];

/**
 * Creates a schedule XML
 * @param  {Object} elements
 * @param  {String} elements.sessionPassword
 * @param  {ListingType} elements.listStatus
 * @param  {Bool} elements.registration
 * @param  {String} elements.registrationURL
 * @param  {Bool} elements.passwordReq
 * @param  {String} elements.registrationURLForMobile
 * @param  {Number} elements.registrationID
 * @param  {JoinStatusType} elements.joinStatus
 * @param  {SessionRegisterStatusType} elements.registrationStatus
 * @param  {Bool} elements.isRegisterIDRequired
 * @param  {String} elements.audioPassword
 * @param  {Bool} elements.isEnforceAudioPassword
 * @param  {Bool} elements.isEnforceAudioLogin
 *
 * @return {String}          accessControl XML
 */
module.exports = elements => {
	validate(elements, ['registration']);

	let elCopy = Object.assign({}, elements);

	if (!elements.listStatus) {
		// set to default public
		elCopy = Object.assign({}, {listStatus: LISTSTATUS[0]});
	}

	if (elements.sessionPassword) {
		if (elements.sessionPassword.length > 16) {
			throw new Error('Expected elements.sessionPassword to be shorter than 16 characters');
		}
	}

	if (elements.audioPassword) {
		if (elements.audioPassword.length > 16) {
			throw new Error('Expected elements.audioPassword to be shorter than 16 characters');
		}
	}

	if (elements.listStatus) {
		validType(LISTSTATUS, elements.listStatus);
	}

	if (elements.joinStatus) {
		validType(JOINSTATUS, elements.joinStatus);
	}

	if (elements.registrationStatus) {
		validType(REGSTATUS, elements.registrationStatus);
	}

	return elCopy;
};
