# webex-api-client [![Build Status](https://travis-ci.org/brh55/webex-api-client.svg?branch=master)](https://travis-ci.org/brh55/webex-api-client) [![Coverage Status](https://coveralls.io/repos/github/brh55/webex-api-client/badge.svg?branch=master)](https://coveralls.io/github/brh55/webex-api-client?branch=master)

> A node module to simplify interacting with Cisco WebEx XML-based APIs from the browser or server

The nature of XML-based WebEx APIs requires the construction of many intricate XML elements, which can be tediuous to build in a robust, succient fashion. The `webex-api-client` alleviates these pain points through the `Builder` class by providing a flatter, more simplified object to be used for XML construction. In addition, the client offers some level of validation for enumerated types, required properties, and value constraints to help prevent malformed request prior to being sent to the WebEx services.

**Nutshell Features:**
- `Builder` to create complicated XML in a DRY, and partial application fashion
- Some level of validation for XML values, constraints, and WebEx enumerated types
- Built-in parsers that provide simpler, flatter objects to create heavily nested, and redudant XML trees
- Robust and well-tested code, built with more than 95% coverage

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
All XML WebEx elements are passed a JSON representation of the XML equivalent unless specified, please refer to the schemas provided for more details. To prevent deeply nested JSON, specific methods will document simpler expected structures that will be converted by the Builder.

#### Element Method Signature
`Builder.elementName(XMLObj)`

### accessControl
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/accesscontrol.html)

### assistService
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/assistservice.html)

### attendeeName
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/attendeename.html)

### attendeeOptions
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/attendeeoptions.html)

### enableOptions
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/enableoptions.html)

### fullAccessAttendees(attendees)
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/fullaccessattendees.html)

#### attendees
**Type:** `array` of modified [attendee](#attendee)

### limitedAccessAttendees
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/fullaccessattendees.html)

#### attendees
Type: `array` of modified [attendee](#attendee)

### listControl
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/listcontrol.html)

### order(listOfOrderSettings)
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/order.html)

#### listOfOrderSettings
**Type:** `array` of order settings `{ orderBy, orderAD }` <br>
**Example:**
```
[
  {
    orderBy: 'STATUS',
    orderAD: 'DESC'
  },
  {
    orderBy: 'HOSTNAME',
    orderAD: 'ASC'
  }
]
```

### metaData
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/metadata.html)

### meetingKey
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/meetingkey.html)

### order(input)
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/order.html)

#### Input
**Type:** `array` containing `{ orderBy: ENUM_VALUE, orderAD: ENUM_VALUE }`
**Example:**
```js
// Input Example
[
  {
    orderBy: 'STATUS',
    orderAD: 'ASC'
  }
]
```

### participants
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/participants.html)

#### XMLObj.attendees
**Type:** `array` of modified [attendee](#attendee) <br>
**Example:** 

```js
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

### sessionKey
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/sessionkey.html)


### schedule
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/schedule.html)

### telephony
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/telephony.html)

### teleconference
*Not all required properties are validated* <br>
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/teleconference.html)

### tracking
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/tracking.html)

#### XMLObj.tracking
**Type:** `Array` of trackingCodes <br>
**Example:** `['1', 'code231', 'code4516', '3']`

## Modified Types
### Attendee
The [attendeeType](https://developer.cisco.com/media/webex-xml-api-schemas-update/attendeetype.html) has a nested person object, in the client, this is denested and abstracted for easier use. 

**Properties:**
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

## XML Misc Options
### setEncoding(encoding)
#### encoding
**Type:** `ENUM`

Any of the following encodings: 'UTF-8', 'ISO-8859-1', 'BIG5', 'Shift_JIS', 'EUC-KR', 'GB2312'.

### setService(WebExService)
**Type:** `ENUM`

A matching WebEx service type, currently `webex-api-client` only supports the following:
#### Meeting Service
- `CreateMeeting`
- `DelMeeting`
- `GethosturlMeeting`
- `GetjoinurlMeeting`
- `GetMeeting`
- `GetTeleconferenceSession`
- `SetMeeting`
- `LstsummaryMeeting`

## Request
### exec()
Executes the XML request and sends it to the `serviceUrl`

### toBuilder()
Return to `Builder` retaining all elements used during construction

**Example Usage:**
```js
const WebExBuilder = Client.Builder(accessControl, 'http://test.webex.com/')
const FirstMeeting = WebExBuilder
                      .metaData({
                        confName: 'First Meeting'
                      })
                      .schedule({
                        startDate: new Date(2017, 0, 20),
                        openTime: 100,
                        duration: 20
                      })
                      .setService('CreateMeeting')
                      .build();
										
const SecondMeeting = CreateMeeting
                        .toBuilder()
                        .metaData({ confName: 'Second Meeting' });

// Create both meetings
const f1Promise = FirstMeeting.exec();
const f2Promise = SecondMeeting.exec();

// Log when both meetings are created
Promise.all([f1Promise, f2Promise])
  .then((responses) => { console.log('meetings created!') })
  .catch(console.log);
```

### newBuilder([securityContext, serviceUrl])
Destroys the previous builder with all XML elements, and returns a new Builder object with the existing security context and service url set. This can be overridden by the optional parameters passed in.

**Exmaple Usage:**
```js
const WebExBuilder = Client.Builder(accessControl, 'http://test.webex.com/');
const CreateMeeting = WebExBuilder
                        .metaData({
                          confName: 'First Meeting'
                        })
                        .schedule({
                          startDate: new Date(2017, 0, 20),
                          openTime: 100,
                          duration: 20
                        })
                        .setService('CreateMeeting')
                        .build();

const delMeeting = CreateMeeting
                    .newBuilder()
                    .meetingKey(12345)
                    .setService('DelMeeting')
                    .build();

delMeeting.exec();
```

## License

MIT © [Cisco Innovation Edge](https://github.com/cisco-ie/webex-api-client)
