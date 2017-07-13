const fetch = require('isomorphic-fetch');
const XMLRequest = require('./request');

module.exports = class Client {
	constructor(creds, url) {
		this.payloadObject = new XMLRequest(creds);
		this.url = url;
	}

	_setPayload(data) {
		this.payloadObject.append(data);
		return this;
	}

	participants(participants) {
		// Pass the participants properties into a nested participants object
		// {} => {particiants: {}}
		return this._setPayload({participants});
	}
	metaData(metaData) {
		return this._setPayload({metaData});
	}
	accessControl(accessControl) {
		return this._setPayload({accessControl});
	}
	enableOptions(enableOptions) {
		return this._setPayload({enableOptions});
	}
	schedule(schedule) {
		return this._setPayload({schedule});
	}
	telephony(telephony) {
		return this._setPayload({telephony});
	}

	createMeeting() {
		return this._send('CreateMeeting');
	}

	_build(service) {
		this.xmlPayload = this.payloadObject.xml(service);
	}

	_send(service) {
		this._build(service);

		return fetch(this.url, {
			method: 'POST',
			headers: {
				'Content-Type': 'text/xml'
			},
			body: this.xmlPayload
		})
		.then(checkStatus)
		.then(r => r.text());
	}
};

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}

	var error = new Error(response.statusText);
	error.response = response;
	throw error;
}
