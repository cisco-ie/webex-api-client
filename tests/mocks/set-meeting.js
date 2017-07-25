module.exports = `<?xml version="1.0" encoding="UTF-8"?>
<serv:message>
  <header>
    <securityContext>
      <webExID>testuser</webExID>
      <password>password123</password>
      <siteId>tester</siteId>
    </securityContext>
  </header>
  <body>
	<bodyContent
   xsi:type="java:com.webex.service.binding.meeting.SetMeeting">
	   <metaData>
	      <confName>SetMeeting</confName>
	      <meetingType>1</meetingType>
	      <agenda>Test</agenda>
	   </metaData>
	   <participants>
	      <maxUserNumber>4</maxUserNumber>
	   </participants>
	   <enableOptions>
	      <chat>false</chat>
	      <poll>true</poll>
	      <audioVideo>true</audioVideo>
	   </enableOptions>
	   <schedule>
	      <startDate>06/01/2004 23:06:27</startDate>
	      <duration>60</duration>
	      <timeZone>GMT-05:00, S. America Pacific (Bogota)</timeZone>
	   </schedule>
	   <telephony>
	      <numPhoneLines>0</numPhoneLines>
	      <telephonySupport>NONE</telephonySupport>
	   </telephony>
	   <remind>
	      <enableReminder>true</enableReminder>
	      <emails>
	         <email>user@user.com</email>
	      </emails>
	   </remind>
	   <attendeeOptions>
	      <auto>true</auto>
	   </attendeeOptions>
	   <meetingKey>48591508</meetingKey>
	</bodyContent>
  </body>
</serv:message>`.replace(/(\r\n|\n|\r|\t|\s{2,})/gm, '');
// Remove tabs/spaces 2 or more/new line break
