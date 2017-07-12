module.exports = `<?xml version="1.0" encoding="ISO-8859-1"?>
<serv:message xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<header>
<securityContext>
<webExID>hostid</webExID>
<password>hostpassword</password>
<siteID>0000</siteID>
<partnerID>9999</partnerID>
<email>johnsmith@xyz.com</email>
</securityContext>
</header>
<body>
<bodyContent
xsi:type="java:com.webex.service.binding.meeting.CreateMeeting">
<accessControl>
<meetingPassword>pass123</meetingPassword>
</accessControl>
<metaData>
<confName>Sample Meeting</confName>
<meetingType>1</meetingType>
<agenda>Test</agenda>
</metaData>
<participants>
<maxUserNumber>4</maxUserNumber>
<attendees>
<attendee>
<person>
<name>James Kirk</name>
<email>Jkirk@sz.webex.com</email>
</person>
</attendee>
</attendees>
</participants>
<enableOptions>
meet:repeat Figure G-43 on page 734
meet:remind Figure G-42 on page 734
meet:attendeeOptions Figure G-35 on page 730
meet:assistService Figure G-52 on page 739
Table 5-2 • CreateMeeting Schema Diagram Cross-References (Continued)
Schema Name Destination Link
210 Cisco WebEx XML API Reference Guide
Meeting Service
<chat>true</chat>
<poll>true</poll>
<audioVideo>true</audioVideo>
</enableOptions>
<schedule>
<startDate>05/31/2004 10:10:10</startDate>
<openTime>900</openTime>
<joinTeleconfBeforeHost>true</joinTeleconfBeforeHost>
<duration>20</duration>
<timeZoneID>4</timeZoneID>
</schedule>
<telephony>
<telephonySupport>CALLIN</telephonySupport>
<extTelephonyDescription>
Call 1-800-555-1234, Passcode 98765
</extTelephonyDescription>
</telephony>
</bodyContent>
</body>
</serv:message>`.replace(/\n/g, '');
