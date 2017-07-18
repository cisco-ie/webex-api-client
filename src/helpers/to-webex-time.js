// TODO: use https://github.com/cisco-ie/webex-time when public
const moment = require('moment');

/**
 * Converts a Date Object to a MM/DD/YYYY HH:mm:ss format for WebEx
 * @param  {[type]} time [description]
 * @return {[type]}      [description]
 */
module.exports = time => {
	if (!moment(time).isValid()) {
		throw new Error(`Expected valid time format, instead recieved ${time}`);
	}
	return moment(time).format('MM/DD/YYYY HH:mm:ss');
};
