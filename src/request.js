const xmlBuilder = require('./xml-builder')('serv:message');
const parsers = require('./parsers/index');
const WEBEXSERVICE = require('./constants/webex-services');

module.exports = class XMLRequest {
	constructor(creds, body) {
		this.header = {
			securityContext: parsers.securityContext(creds)
		};
		this.body = body || {};
	}

	setSecurityContext(header) {
		this.header = header;
	}

	_validateAndTransform(data) {
		// Attempt to find a parser/validator
		// Parse the object contents, then return
		// the same key with the parsed object
		const elementRoot = Object.keys(data)[0];
		const element = data[elementRoot];
		const parser = parsers[elementRoot];

		if (parser) {
			let parsedObj = {};
			parsedObj[elementRoot] = parser(element);
			return parsedObj;
		}

		return data;
	}

	append(object) {
		const parsed = this._validateAndTransform(object);
		this.body = Object.assign({}, this.body, parsed);
	}

	get full() {
		return {
			header: this.header,
			body: this.body
		};
	}

	xml(service) {
		const desiredService = WEBEXSERVICE[service];
		if (!desiredService) {
			throw new Error('Not a valid WebEx Service');
		}

		const body = {
			bodyContent: {
				$: {
					'xsi:type': desiredService
				},
				body: this.body
			}
		};

		const xmlObj = {
			header: this.header,
			body
		};

		return xmlBuilder.buildObject(xmlObj);
	}
};
