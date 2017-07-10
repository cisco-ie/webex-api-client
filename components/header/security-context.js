'use strict';
// Security context provides some pre-validation
// to prevent unnecessary request sent to the wire
// create note about passwords in clear text should be done through HTTPS
// LINK: https://developer.cisco.com/site/webex-developer/develop-test/xml-api/api-guide/#global-request-elements-in-security-context

const mapKeys = require('lodash.mapkeys');
const xmlBuilder = require('../../libs/xml-builder')('securityContext');

/**
 * Generates the security context XML
 * @param  {object} elements
 * @param  {string} elements.siteName || elements.siteID
 * @param  {string} elements.webExID ||  elements.email
 * @param  {string} elements.password || elements.sessionTicket
 * @param  {string} elements.partnerID
 * @return {string}            xml <securityContext> string
 */
module.exports = elements => {
	const eCopy = mapKeys(elements, (v, k) => k.toLowerCase());

	// Throw error if one of the two don't exists
	if (!eCopy.sitename && !eCopy.siteid) {
		throw new Error('Missing required keys: siteName or siteID');
	}

	if (!eCopy.webexid && !eCopy.email) {
		throw new Error('Missing required keys: email or webExID');
	}

	if (!eCopy.password && !eCopy.sessionTicket) {
		throw new Error('Missing required keys: password or sessionTicket');
	}

	return xmlBuilder.buildObject(elements);
};
