# webex-api-client [![Build Status](https://travis-ci.org/cisco-ie/webex-api-client.svg?branch=master)](https://travis-ci.org/cisco-ie/webex-api-client) [![Coverage Status](https://coveralls.io/repos/github/cisco-ie/webex-api-client/badge.svg?branch=master)](https://coveralls.io/github/cisco-ie/webex-api-client?branch=master)

> A node module to simplify interacting with Cisco WebEx XML-based APIs from the browser or server

> *🚨 Disclaimer 🚨*
>
> Due to the extent of the XML WebEx APIs, this repository is no longer being actively developed, and is given to be used "as-is". However, the innovation edge team will continue to take additional pull-request for fixes or new features, but we appologize for the inconvenience.

The nature of XML-based WebEx APIs requires the construction of many intricate XML elements, which can be tediuous to build in a robust, succinct fashion. The `webex-api-client` alleviates these pain points through a `Builder` that provides flatter and simplified objects to be used for XML construction. In addition, the client offers some level of validation for enumerated types, required properties, and value constraints to help prevent malformed request prior to being sent to the WebEx services.

**Nutshell Features:**
- ✅ `Builder` pattern to create complicated XML in a DRY and partial application fashion
- ✅ Some validation for XML values, constraints, and WebEx enumerated type
- ✅ Built-in parsers that provide simpler, flatter objects to create heavily nested, and redudant XML trees
- ✅ Robust and well-tested code built in a test-driven fashion with more than 95% coverage

> **Note:**
> 
> Not all WebEx services are completely supported by the client, refer to [Meeting Service](#meeting-service) for the available services. If there is something you would like to be added, submit a issue and we can consider it as a feature request developed by our team, otherwise we are open to taking additional Pull Requests for additional features :).

## Install

```
$ npm install --save webex-api-client
```

## Usage
### Basic Usage: Get Site Information
```js
const WebExClient = require('webex-api-client');
const securityContext = {
  webExID: 'Test User',
  password: 'pass123',
  siteName: 'hello-world'
};

const requestBuilder = new WebExClient.Builder(securityContext, 'https://hello-world.webex.com/WBXService/XMLService');

const getSite =
   requestBuilder
      .setService('GetSite')
      .build();
      
getSite.exec().then(console.log) // XML WebEx Site Information
```

### Advance Usage: Create Meetings
```js
const WebExClient = require('webex-api-client');
const securityContext = {
  webExID: 'Test User',
  password: 'pass123',
  siteId: 'hello-world'
};

const requestBuilder = new WebExClient.Builder(securityContext, 'https://hello-world.webex.com/WBXService/XMLService');

const createMeeting = 
  requestBuilder
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

// Initiate meeting whenever you are ready
createMeeting
  .exec()
  .then((resp) => console.log('success'));
```

## Builder(securityContext, serviceUrl)
`const Builder = new Client.Builder(securityContext, serviceUrl)`

Returns a [request object](#request) that is executed with `.exec()`

#### securityContext

Type: `object`

WebEx Security Context ([`securityContext`](https://developer.cisco.com/site/webex-developer/develop-test/xml-api/schema/
))

<img src="https://user-images.githubusercontent.com/6020066/36329730-db307886-131b-11e8-8be1-c060e69921f9.png" height="280"/>

#### Using a SessionTicket from Common Identity Webex Teams site

First use an oauth2 flow from Webex Teams integration to obtain a token. This user will need to be an administrator of the webex meeting site. 

Use that token below to get a session token from the webex meetings api. 

```js
const getSessionToken =
   requestBuilder
      .accessToken('token from common identity webex teams user, previously generated from oauth2 flow')
      .setService('AuthenticateUser')
      .build();

getSessionToken.exec().then(console.log);
```

This token will be used as **sessionTicket** in the security context headers. 

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

### tracking(input)
[XML Schema](https://developer.cisco.com/media/webex-xml-api-schemas-update/tracking.html)

#### input
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
- `GetSite`

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
                      .metaData({ confName: 'Second Meeting' })
                      .build();

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

**Example Usage:**
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

## Related
If you found this client useful, don't forget to star this repository and check other related open-source Cisco modules by the Innovation Edge team:

- [cisco-tp-client](https://github.com/cisco-ie/cisco-tp-client) - A node API client to ease interactions with Cisco WebEx Telepresence-enabled endpoints / codecs.
- [rrule-to-webex](https://github.com/cisco-ie/rrule-to-webex) - Converts a RRULE (iCalendar RFC-5545) to Cisco's WebEx recurrence repeat XML tree.
- [webex-time-zones](https://github.com/cisco-ie/webex-time-zones) - 🌐 An enumerated list of Cisco WebEx supported time zones 
- [webex-date](https://github.com/cisco-ie/webex-date) - 🕰 Convert a JavaScript date type, RFC 2822, ISO-8601 to the WebEx XML API supported format.
- [webex-enum-types](https://github.com/cisco-ie/webex-enum-types) - 🍭 A JSON mapping of enumerated types for Cisco's WebEx XML API

## License

MIT © [Cisco Innovation Edge](https://github.com/cisco-ie/webex-api-client)
