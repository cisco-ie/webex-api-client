'use strict';

const xmlBuilder = require('./libs/xmlBuilder')('supportCenter');

module.exports = (elements) => {

	if(elements.orderTabs.length>4){
		throw new Error(`Max 4 tabs allowed in orderTabs`);
	}

    if(typeof(elements.serviceDesk) !== "boolean"){
        throw new Error(`A boolean value should be provided`);
    }

	const resultList = {
		orderTabs :
			[
				{
					"tab" : elements.orderTabs
				}
			],
		serviceDesk :
				{
					"enable" : elements.serviceDesk
				}
	}

	return xmlBuilder.buildObject(resultList);

};
