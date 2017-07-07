const has = require('lodash.has');

module.exports = (srcObj, keys) => {
    // Show the ones that aren't available in the object
    const missingReqKeys = keys.filter((acc, v, k) => !has(srcObj, k));
    if (missingReqKeys.length > 0) {
      throw new Error(`Missing required keys: ${missingReqKeys.toString().replace(',', ' ,')}`);
    }
    return null;
}
