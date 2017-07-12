/**
 * Checks against a list of valid options throws error if not
 * @param  {Array} constants valid type list
 * @param  {?} input     input
 * @return void, throws error if not valid
 */
module.exports = (constants, input) => {
	constants = constants || [];
	const invalidStatus = constants.indexOf(input) === -1;
	if (invalidStatus) {
		throw new Error(`Expected a valid type (${constants.toString().replace(/,/g, ', ')}), received ${input}`);
	}
};
