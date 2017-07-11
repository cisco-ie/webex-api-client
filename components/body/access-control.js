// Per Schema all elements are optional
const xmlBuilder = require('../../libs/xml-builder')('accessControl');
const toTime = require('../../libs/to-webex-time');
const VALIDSTATUS = require('../../constants/list-status');

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
	const eCopy = Object.assign({}, elements);

	if (elements.startDate) {
		eCopy.startDate = toTime(elements.startDate);
	}

	if (elements.listStatus) {
		const invalidStatus = VALIDSTATUS.indexOf(elements.listStatus) === -1;
		if (invalidStatus) {
			throw new Error(`Invalid listStatus, expected [${VALIDSTATUS.toString().replace(/,/g, ', ')}]`);
		}
	}

	return xmlBuilder.buildObject(eCopy);
};
