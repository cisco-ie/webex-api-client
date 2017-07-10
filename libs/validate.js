// @TODO allow case insensitive
// This function will return a list of required keys that are missing
module.exports = (srcObj, keys) => {
    // Show the ones that aren't available in the object
    // handles lowercase
    const srcObjKeys = Object.keys(srcObj).map(item => item.toLowerCase());
    const has = key => srcObjKeys.indexOf(key) !== -1;
    const missingReqKeys = keys.filter((acc, v, k) => !has(k));

    if (missingReqKeys.length > 0) {
      throw new Error(`Missing required keys: ${missingReqKeys.toString().replace(',', ' ,')}`);
    }

    return null;
}
