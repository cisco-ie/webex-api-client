'use strict';

const xmlBuilder = require('./libs/xmlBuilder')('securityContext');
/**
 * Generates the security context XML
 * @param  {object} attributes
 * @param  {string} attributes.sitename
 * @param  {string} attributes.webExID
 * @param  {string} attributes.password
 * @param  {string} attributes.partnerID
 * @param  {string} attributes.email
 * @return {string}            xml <securityContext> string
 */
module.exports = (attributes) => {
	if (!attributes.siteName || !attributes.webExID || !attributes.password) {
		throw new Error('Missing required attributes');
	}
	
	return xmlBuilder.buildObject(attributes);
};
