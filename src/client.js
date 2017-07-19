const fetch = require('isomorphic-fetch');
const XMLRequest = require('./xml-request');
const checkStatus = require('./helpers/check-status');

class Client {
	constructor(Builder) {
		Builder = Builder || {};
		this._Builder = Builder;
		this.payload = Builder.xml;
		this.url = Builder.url;
	}

	toBuilder() {
		return this._Builder;
	}

	newBuilder() {
		return new Client.Builder(this._Builder.creds, this._Builder.url);
	}

	exec() {
		return fetch(this.url, {
			method: 'POST',
			headers: {
				'Content-Type': 'text/xml'
			},
			body: this.payload
		})
		.then(checkStatus)
		.then(r => r.text());
	}
}

// A typical builder fashion, with the exception of storing
// raw data into a data store
Client.Builder = class {
	constructor(creds, url) {
		this.creds = creds;
		this.data = {};
		this.xml = '';
		this.url = url;
	}

	accessControl(accessControl) {
		this.data.accessControl = accessControl;
		return this;
	}
	enableOptions(enableOptions) {
		this.data.enableOptions = enableOptions;
		return this;
	}
	metaData(metaData) {
		this.data.metaData = metaData;
		return this;
	}
	meetingKey(meetingKey) {
		this.data.meetingKey = meetingKey;
		return this;
	}
	participants(participants) {
		// Pass the participants properties into a nested participants object
		// {} => {particiants: {}}
		this.data.participants = participants;
		return this;
	}
	remind(remind) {
		this.data.remind = remind;
		return this;
	}
	schedule(schedule) {
		this.data.schedule = schedule;
		return this;
	}
	setService(service) {
		this.serviceName = service;
		return this;
	}
	telephony(telephony) {
		this.data.telephony = telephony;
		return this;
	}
	tracking(trackingList) {
		this.data.tracking = trackingList;
		return this;
	}

	build() {
		this.request = new XMLRequest(this.creds);
		this.request.append(this.data);
		this.xml = this.request.xml(this.serviceName);
		return new Client(this);
	}
};

module.exports = Client;
