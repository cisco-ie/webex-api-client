const ENUMS = require('../../constants/enum-types');
const validType = require('../../helpers/valid-type');

const ASSIST_REQUEST = ENUMS.assistRequest;
const ASSIST_CONFIRM = ENUMS.assistConfirm;

// Enum check against assistService
module.exports = elements => {
	if (elements.assistRequest) {
		validType(ASSIST_REQUEST, elements.assistRequest);
	}

	if (elements.assistConfirm) {
		validType(ASSIST_CONFIRM, elements.assistConfirm);
	}

	return elements;
};
