// Per Schema all elements are optional
const xmlBuilder = require('../../libs/xml-builder')('accessControl');
const validType = require('../../libs/valid-type');
const validate = require('../../libs/validate');
const LISTSTATUS = require('../../constants/list-status');
const JOINSTATUS = require('../../constants/join-status');
const REGSTATUS = require('../../constants/registration-status');

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

	let eCopy = Object.assign({}, elements);

	if (!elements.listStatus) {
		// set to default public
		eCopy = Object.assign({}, {listStatus: LISTSTATUS[0]});
	}

	if (elements.sessionPassword) {
		if (elements.sessionPassword.length > 16) {
			throw new Error('Expected elements.sessionPassword to be shorter than 16 characters');
		}
	}

	if (elements.audioPassword) {
		if (elements.audioPassword.length > 16) {
			throw new Error('Expected elements.audioPassword to be shorter than 16 characters.');
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

	return xmlBuilder.buildObject(eCopy);
};
