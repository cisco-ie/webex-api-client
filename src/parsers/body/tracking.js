const assert = require('assert');
/**
 * Parses the tracking code list
 * @param {list} elements
 * @return {object} transformedElements
 */
module.exports = elements => {
	assert(Array.isArray(elements), `Expected tracking to be an array, receieved ${typeof elements}`);
	assert(elements.length < 11, `Expected tracking length to be 10 or less, received ${elements.length}`);

	return elements.reduce((acc, value, index) => {
		assert(typeof value === 'string', `Expected tracking item to be a string, received a ${typeof value}`);
		assert(value.length < 129, `Expected tracking item to be 128 characters or less, received ${value.length} characters`);

		const trackingCode = {
			[`trackingCode${index + 1}`]: value
		};

		return Object.assign(acc, trackingCode);
	}, {});
};
