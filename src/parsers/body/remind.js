/**
 * Parses the tracking code list
 * @param {list} elements
 * @return {object} transformedElements
 */
module.exports = elements => {
	const emails = elements.emails;
	if (emails && Array.isArray(emails)) {
		const elCopy = Object.assign({}, elements);
		elCopy.emails = {
			email: emails
		};
		return elCopy;
	}

	return elements;
};
