const fetch = require('isomorphic-fetch');
const xmlBuilder = require('./xml-builder');
const xmlRequest = require('./request');

module.exports = class client {
	constructor (creds, url) {
		this.payloadObject = new xmlRequest(creds);
		this.url = url;
		this.webExService;
	}

	_setPayload(data) {
		this.payloadObject.append(data);
		return this;
	}

	participants (participants) {
		return this._setPayload({ participants });
	}
	metaData (metaData) {
		return this._setPayload({ metaData });
	}
	accessControl (accessControl) {
		return this._setPayload({ accessControl });
	}
	enableOptions (enableOptions) {
		return this._setPayload({ enableOptions });
	}
	schedule (schedule) {
		return this._setPayload({ schedule });
	}
	telephony (telephony) {
		return this._setPayload({ telephony });
	}

	createMeeting(options) {
		return this._send();
	}

	_build() {
		this.xmlPayload = this.payloadObject.xml();
	}

	_send() {
		this._build();
		console.log(this);
		return fetch(this.url, {
			body: this.xmlPayload
		});
	}
}
