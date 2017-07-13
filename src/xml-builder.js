// This returns a xml builder with our settings
const xml2js = require('xml2js');
// Settings
const encoding = 'ISO-8859-1';

module.exports = rootName => {
	return new xml2js.Builder({
		headless: false,
		xmldec: {
			encoding
		},
		renderOpts: {
			pretty: false
		},
		rootName
	});
};
