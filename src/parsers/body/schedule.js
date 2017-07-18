// Per Schema all elements are optional
const toTime = require('../../helpers/to-webex-time');
const ENUMS = require('../../constants/enum-types');
const validType = require('../../helpers/valid-type');

const ENTRYEXITTONES = ENUMS.entryExitTone;

/**
 * Creates a schedule XML
 * @param  {Object} elements
 * @param  {Date} elements.startDate
 * @param  {Number} elements.duration
 * @param  {Number} elements.openTime
 * @param  {String} elements.hostWebExID
 * @param  {String} elements.entryExitTone
 * @param  {String} elements.extURL
 * @param  {Number} elements.extNotifyTime
 * @param  {String} elements.joinNotifyURL
 * @param  {Bool} elements.joinTeleconfBeforeHost
 * @param  {Bool} elements.timeZoneID
 * @param  {Bool} elements.timeZone
 * @param  {String} elements.showFilePath
 * @param  {Bool} elements.showFileStartMode
 * @param  {Bool} elements.showFileContPlayFlag
 * @param  {Number} elements.showFileInterVal
 * @param  {Bool} elements.firstAttendeeAsPresenter
 *
 * @return {Object}          Parsed schedule object
 */
module.exports = elements => {
	let elCopy = Object.assign({}, elements);

	if (elements.startDate) {
		elCopy.startDate = toTime(elements.startDate);
	}

	if (elements.entryExitTone) {
		validType(ENTRYEXITTONES, elements.entryExitTone);
	}

	return elCopy;
};
