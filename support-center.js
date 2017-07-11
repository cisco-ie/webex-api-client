'use strict';

const xmlBuilder = require('./libs/xml-builder')('supportCenter');

/**
 * Generates the support center XML
 * @param {object} elements
 * @param {list} elements.orderTabs
 * @param {boolean} elements.serviceDesk
 * @return {string} xml <supportCenter> string
 */
module.exports = elements => {
	if (elements.orderTabs.length > 4) {
		throw new Error(`Expected number of tabs : 4, Received ` + elements.orderTabs.length);
	}
	if (typeof (elements.serviceDesk) !== 'boolean') {
		throw new Error(`Expected serviceDesk value: boolean, Received: ` + typeof (elements.serviceDesk));
	}
	const resultList = {
		orderTabs:
		[
			{

				tab: elements.orderTabs
			}
		],
		serviceDesk:
		{
			enable: elements.serviceDesk
		}
	};
	return xmlBuilder.buildObject(resultList);
};
