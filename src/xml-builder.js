// This returns a xml builder with our settings
const xml2js = require('xml2js');

module.exports = (root, encoding) => {
	const options = {
		headless: false,
		xmldec: {
			encoding
		},
		renderOpts: {
			pretty: false
		}
	};

	if (typeof root === 'object') {
		// Mock the xmlBuilder if we receive a JS xml object for the root
		// this will provide a function that will wrap it's initial object with the root
		return {
			buildObject: function (jsObject) {
				const rootName = Object.keys(root)[0];
				const xmlBuilder = new xml2js.Builder(options);
				const newObject = {
					[rootName]: {
						...root[rootName],
						...jsObject
					}
				};
				return xmlBuilder.buildObject(newObject);
			}
		};
	}

	const xmlBuilder = new xml2js.Builder({
		...options,
		rootName: root
	});

	return xmlBuilder;
};
