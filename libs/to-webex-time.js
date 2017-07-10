const moment = require('moment');

module.exports = time => {
	if (!moment(time).isValid()) {
		throw new Error(`Expected valid time format, instead recieved ${time}`);
	}
	return moment(time).format('MM/DD/YYYY HH:mm:ss');
};
