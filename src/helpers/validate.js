// This function will return a list of required keys that are missing
module.exports = (srcObj, keys) => {
	// Show the ones that aren't available in the object
	// handles lowercase
	const srcObjKeys = Object.keys(srcObj).map(item => item.toLowerCase());
	const has = key => srcObjKeys.indexOf(key) === -1;
	// If the key exist in the src object, then remove it from the list
	const normalizeKeys = keys.map(k => k.toLowerCase());
	const missingReqKeys = normalizeKeys.filter(k => has(k));

	if (missingReqKeys.length > 0) {
		throw new Error(`Missing required keys: ${missingReqKeys.toString().replace(/,/g, ', ')}`);
	}

	return null;
};
