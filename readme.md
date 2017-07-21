# webex-api-client [![Build Status](https://travis-ci.org/brh55/webex-api-client.svg?branch=master)](https://travis-ci.org/brh55/webex-api-client) [![Coverage Status](https://coveralls.io/repos/github/brh55/webex-api-client/badge.svg?branch=master)](https://coveralls.io/github/brh55/webex-api-client?branch=master)

> A node module to simplify interacting with Cisco WebEx XML-based APIs from the browser or server

The nature of XML-based WebEx APIs requires the construction of many intricate XML elements, which can be tediuous to build in a robust, succient fashion. The `webex-api-client` alleviates these pain points through the `Builder` class by providing a flatter, more simplified object to be used for XML construction. In addition, the client offers some level of validation for enumerated types, required properties, and value constraints to help prevent malformed request prior to being sent to the WebEx services.

**Nutshell Features:**
- `Builder` to create complicated XML
- Some level of validation for XML values and defined elements
- Flatter and simpler object parameters for XML equivalents 

## Install

```
$ npm install --save webex-api-client
```

## Usage

```js
const WebExClient = require('webex-api-client');
const requestBuilder = new WebExClient.Builder;

const securityContext = {
  webExId: 'Test User',
  password: 'pass123',
  siteId: 'mycompany'
};

const createMeeting = 
  requestBuilder(securityContext, 'http://test.webex.com/api')
    .metaData({
      confName: 'Sample Meeting',
      meetingType: 1,
    })
    .participants({
      attendees: [
        {
          name: 'Jane Doe',
          email: 'jdoe@gmail.com'
        }
      ]
    })
    .schedule({
      startDate: new Date(), // today
      openTime: 900,
      duration: 30,
      timezoneID: 5
    })
    .setService('CreateMeeting')
    .build();

// Initiate meeting
createMeeting
  .exec()
  .then((resp) => console.log('success'));
```

## Builder(securityContext, serviceUrl)
`const Builder = new Client.Builder(securityContext, serviceUrl)`

Returns a request object that is executed with `.exec()`

#### securityContext

Type: `object`

WebEx Security Context ([`securityContext`](https://developer.cisco.com/site/webex-developer/develop-test/xml-api/schema/
))

#### serviceUrl
**Type:** `string`

The url for the WebEx service for the request to be sent to

### build()
Construct the final XML and returns a `Request`

## Builder XML WebEx Elements
All XML WebEx elements are passed a JSON representation of the XML equivalent, please refer to the schemas provided for more details. To prevent deeply nested JSON, specific methods will document simpler expected structures that will be converted by the Builder.

### accessControl
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/accesscontrol.html)

### assistService
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/assistservice.html)

### attendeeOptions
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/attendeeoptions.html)

### enableOptions
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/enableoptions.html)

### metaData
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/metadata.html)

### meetingKey
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/meetingkey.html)

### participants
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/participants.html)

#### XMLObj.attendees
**Type:** `array` of [attendee](https://developer.cisco.com/site/webex-developer/develop-test/xml-api/schema/) <br>
**Example:** 

```
attendees: [
	{
		name: 'James Kirk',
		email: 'Jkirk@sz.webex.com',
		joinStatus: 'REGISTER'
	},
	{
			email: 'Jdoe@sz.webex.com',
			name: 'Jane Doe',
			firstName: 'Jane',
			lastName: 'Doe',
			notes: 'Testing',
			joinStatus: 'INVITE'
		}
]
```

##### Attendee Properties
- name
- firstName
- lastName
- title
- company
- webExID
- address
- phones
- email
- notes
- url
- type
- sendReminder
- joinStatus

### repeat
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/repeat.html)

#### XMLObj.expirationDate
**Type:** `Date`, RFC 2822, ISO-8601 <br>
**Example:** `new Date()`

#### XMLObj.dayInWeek
**Type:** `Array` of Day <br>
**Example:** `['MONDAY', 'TUESDAY', 'THURSDAY']`

### remind
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/remind.html)

#### XMLObj.emails
**Type:** `Array` of emails <br>
**Example:** `['test@test.com', 'helloWorld@gmail.com']`

### schedule
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/schedule.html)

### telephony
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/telephony.html)

### tracking
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/tracking.html)

#### XMLObj.tracking
**Type:** `Array` of trackingCodes <br>
**Example:** `['1', 'code231', 'code4516', '3']`

## XML Misc Options
### setEncoding(encoding)
#### encoding
**Type:** `ENUM`

Any of the following encodings: 'UTF-8', 'ISO-8859-1', 'BIG5', 'Shift_JIS', 'EUC-KR', 'GB2312'.

### setService(WebExService)
**Type:** `ENUM`

A matching WebEx service type, currently `webex-api-client` only supports the following:
- 'CreateMeeting'
- 'DelMeeting'

## Request
### exec()
Executes the XML request and sends it to the `serviceUrl`

### toBuilder()
Return to `Builder` retaining all elements used during construction

### newBuilder([securityContext, serviceUrl])
Destroys the previous builder with all XML elements, and returns a new Builder object with the existing security context and service url set. This can be overridden by the optional parameters passed in.

## License

MIT © [Cisco Innovation Edge](https://github.com/cisco-ie/webex-api-client)
