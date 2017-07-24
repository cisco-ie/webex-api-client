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
		<bodyContent xsi:type="java:com.webex.service.binding.meeting.GetMeeting">
			<meetingKey>48591508</meetingKey>
		</bodyContent>
  </body>
</serv:message>`.replace(/(\r\n|\n|\r|\t|\s{2,})/gm, '');
// Remove tabs/spaces 2 or more/new line break
