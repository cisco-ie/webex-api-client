module.exports = `<?xml version="1.0" encoding="ISO-8859-1"?>
<serv:message>
  <header>
    <securityContext>
      <webExID>testuser</webExID>
      <password>password123</password>
      <siteId>tester</siteId>
    </securityContext>
  </header>
  <body>
    <bodyContent xsi:type="java:com.webex.service.binding.meeting.CreateMeeting">
      <body>
        <metaData>
          <confName>Sample Meeting</confName>
          <meetingType>1</meetingType>
          <agenda>Test</agenda>
        </metaData>
        <participants>
          <name>James Kirk</name>
          <email>JKirk@sz.webex.com</email>
        </participants>
        <schedule>
          <startDate>05/31/2004 10:10:10</startDate>
          <openTime>900</openTime>
          <joinTeleconfBeforeHost>true</joinTeleconfBeforeHost>
          <duration>20</duration>
          <timezoneID>4</timezoneID>
        </schedule>
      </body>
    </bodyContent>
  </body>
</serv:message>`.replace(/(\r\n|\n|\r|\t|\s{2,})/gm,'');
// Remove tabs/spaces 2 or more/new line break
