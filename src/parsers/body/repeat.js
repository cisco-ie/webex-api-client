/**
 * Generates the support center XML
 * @param {object} elements
 * @param {list} elements.orderTabs
 * @param {boolean} elements.serviceDesk
 * @return {object} transformedElements
 */

const ENUMS = require('../../constants/enum-types');
const validType = require('../../helpers/valid-type');
const toWebExTime = require('../../helpers/to-webex-time');

const REPEAT_TYPES = ENUMS.repeatType;
const DAYS = ENUMS.day;

module.exports = input => {
	const inputCopy = Object.assign({}, input);

	// @TODO: This will be implemented once rrule-to-webex is available
	// to public
	//
	// if (typeof input === 'string') {
	// 	// return convert(input);
	// }
	//

	if (input.repeatType) {
		validType(REPEAT_TYPES, input.repeatType);
	}

	if (input.expirationDate) {
		inputCopy.expirationDate = toWebExTime(input.expirationDate);
	}

	const weekDays = input.dayInWeek;
	if (weekDays && Array.isArray(weekDays)) {
		weekDays.forEach(day => validType(DAYS, day));
		inputCopy.dayInWeek = {
			day: weekDays
		};
	}

	return inputCopy;
};
