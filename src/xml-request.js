const createBuilder = require('./xml-builder');
const parsers = require('./parsers/index');
const validType = require('./helpers/valid-type');
const WEBEXSERVICE = require('./constants/webex-services');
const ENCODINGS = require('./constants/xml-encodings');

module.exports = class XMLRequest {
	constructor(creds) {
		this.header = {
			securityContext: parsers.securityContext(creds)
		};
		this.body = {};
	}

	_validateAndTransform(data) {
		// Attempt to find a parser/validator
		// Parse the object contents, then return
		// the same key with the parsed object
		const elementRoots = Object.keys(data);

		// Reduce each property in the object to be passed through the
		// parser
		const parsed = elementRoots.reduce((acc, elementKey) => {
			const element = data[elementKey];
			const parser = parsers[elementKey];
			if (parser) {
				let parsedObj = {
					[elementKey]: parser(element)
				};
				return Object.assign(acc, parsedObj);
			}
			return Object.assign(acc, {[elementKey]: element});
		}, {});

		return parsed;
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

	xml(service, encoding) {
		if (encoding) {
			validType(ENCODINGS, encoding);
		}
		const xmlBuilder = createBuilder('serv:message', encoding);

		const desiredService = WEBEXSERVICE[service];
		if (!desiredService) {
			throw new Error(`Recieved ${service} as WebEx service, expected a valid service in order to build request.`);
		}

		const attr = {
			$: {
				'xsi:type': desiredService
			}
		};

		const bodyContent = Object.assign({}, attr, this.body);
		const body = {
			bodyContent
		};

		const xmlObj = {
			header: this.header,
			body
		};

		return xmlBuilder.buildObject(xmlObj);
	}
};
