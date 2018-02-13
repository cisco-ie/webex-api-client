const WebExClient = require('./src/client.js');

const securityContext = {
	webExID: 'brandonhim@live.com',
	password: 'Che3se123',
	siteName: 'apidemoeu'
};

const requestBuilder = new WebExClient.Builder(securityContext, 'https://apidemoeu.webex.com/WBXService/XMLService');

const createMeeting =
	  requestBuilder
      .setService('GetSite')
      .build();

createMeeting.exec().then(console.log);
