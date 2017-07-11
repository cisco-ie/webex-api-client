// Per Schema all elements are optional
const xmlBuilder = require('../../libs/xml-builder')('schedule');
const toTime = require('../../libs/to-webex-time');
const VALIDTONES = require('../../constants/entry-exit-tone');
const validType = require('../../libs/valid-type');

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
 * @return {[type]}          [description]
 */
module.exports = elements => {
	const eCopy = Object.assign({}, elements);

	if (elements.startDate) {
		eCopy.startDate = toTime(elements.startDate);
	}

	if (elements.entryExitTone) {
		validType(VALIDTONES, elements.entryExitTone);
	}

	return xmlBuilder.buildObject(eCopy);
};
