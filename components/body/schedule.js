// Per Schema all elements are optional
const xmlBuilder = require('../../libs/xmlBuilder')('schedule');
const mapKeys = require('lodash.mapkeys');
const toTime = require('../../libs/toWebExTime');
const validate = require('../../libs/validate');
const VALIDTONES = require('../../constants/entryExitTone');

/**
 * Creates a schedule XML
 * @param  {Object} elements
 * @param  {Date} elements.startDate
 * @param  {Number} elements.duration
 * @param  {Number} elements.openTime
 * @param  {String} elements.hostWebExID
 * @param  {String} elements.entryExitTone
 * @param  {Object} elements
 * @param  {Object} elements
 * @param  {Object} elements
 *
 * @return {[type]}          [description]
 */
module.exports = (elements) => {
  const eCopy = Object.assign({}, elements);
  if (elements.startDate || elements.startdate) {
    eCopy.startDate = toTime(elements.startDate);
  }

  if (elements.entryExitTone) {
    const invalidTone = VALIDTONES.indexOf(elements.entryExitTone) === -1;
    if (invalidTone) {
      throw new Error(`Invalid entryExitTone, expected [${VALIDTONES.toString().replace(/,/g, ', ')}]`);
    }
  }

  return xmlBuilder.buildObject(eCopy);
}
