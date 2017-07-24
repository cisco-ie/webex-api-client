// This function will return a list of required keys that are missing
module.exports = (srcObj, keys, elementIn) => {
	// Show the ones that aren't available in the object
	// handles lowercase
	const srcObjKeys = Object.keys(srcObj).map(item => item.toLowerCase());
	const has = key => srcObjKeys.indexOf(key) === -1;
	// If the key exist in the src object, then remove it from the list
	const normalizeKeys = keys.map(k => k.toLowerCase());
	const missingReqKeys = normalizeKeys.filter(k => has(k));

	if (missingReqKeys.length > 0) {
		const missingKeys = missingReqKeys.toString().replace(/,/g, ', ');
		const errorMessage =`Missing required keys: ${missingKeys}`;
		if (elementIn) {
			throw new Error(`${errorMessage} in ${elementIn}`);
		} else {
			throw new Error(errorMessage);
		}
	}

	return null;
};
