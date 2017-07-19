// This returns a xml builder with our settings
const xml2js = require('xml2js');

module.exports = (rootName, encoding) => {
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
