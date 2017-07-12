require('isomorphic-fetch');
const xmlBuilder = require('./xml-builder');
const xmlRequest = require('./request');

module.exports = class client {
	constructor (creds, url) {
		this.payloadObject = new xmlRequest(creds);
		this.url = url;
		this.webExService;
	}

	participants (participants) {
		this.payloadObject.append({ participants });
		return this;
	}
	metaData (metaData) {
		this.payloadObject.append({ metaData });
		return this;
	}
	accessControl (accessControl) {
		this.payloadObject.append({ accessControl });
		return this;
	}
	enableOptions (enableOptions) {
		this.payloadObject.append({ enableOptions });
		return this;
	}
	schedule (schedule) {
		this.payloadObject.append({ schedule });
		return this;
	}
	telephony (telephony) {
		this.payloadObject.append({ telephony });
		return this;
	}

	createMeeting(options) {
		return this._send();
	}

	_build() {
		this.xmlPayload = this.payloadObject.xml();
	}

	_send() {
		this._build();
		return fetch(this.url, {
			method: 'POST',
			headers: {
				'Content-Type': 'text/xml'
			},
			body: this.xmlPayload
		});
	}
}
