const ENUMS = require('../../constants/enum-types');
const validType = require('../../helpers/valid-type');
const bs = require('../../xml-builder')('ttest');

const ORDER_BY = ENUMS.orderBy;
const ORDER_AD = ENUMS.orderAD;

// Enum check against assistService
module.exports = elements => {
	if (!Array.isArray(elements)) {
		throw new Error('Expected order to receive an array ([ {orderBy, orderAD}, {orderBy, orderAD} ])')
	}

	// Validate
	return elements.reduce((acc, element) => {
		if (element.orderBy) {
			validType(ORDER_BY, element.orderBy);
			// Copy + add last element
			acc.orderBy = [...acc.orderBy, element.orderBy];
		}
		if (element.orderAD) {
			validType(ORDER_AD, element.orderAD);
			acc.orderAD = [...acc.orderAD, element.orderAD];
		}

		return acc
	}, { orderBy: [], orderAD: []});
};
