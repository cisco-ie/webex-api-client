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
        <bodyContent xsi:type="java:com.webex.service.binding.meeting.auo.CreateTeleconf
erenceSession">
            <accessControl>
                <listStatus>PUBLIC</listStatus>
                <sessionPassword>123456</sessionPassword>
								<registration>true</registration>
            </accessControl>
            <metaData>
                <confName>Sample Teleconference-only meeting</confName>
            </metaData>
            <fullAccessAttendees>
                <attendee>
                    <name>1</name>
                    <email>1@1.com</email>
                </attendee>
            </fullAccessAttendees>
            <limitedAccessAttendees>
                <attendee>
                    <name>2</name>
                    <email>2@2.com</email>
                </attendee>
            </limitedAccessAttendees>
            <schedule>
                <startDate>04/18/2005 15:08:51</startDate>
                <timeZoneID>45</timeZoneID>
                <entryExitTone>ANNOUNCENAME</entryExitTone>
            </schedule>
            <teleconference>
                <extTelephonyDescription>xml</extTelephonyDescription>
            </teleconference>
            <tracking>
                <trackingCode1>1</trackingCode1>
                <trackingCode2>2</trackingCode2>
                <trackingCode3>3</trackingCode3>
                <trackingCode4>4</trackingCode4>
                <trackingCode5>5</trackingCode5>
                <trackingCode6>6</trackingCode6>
                <trackingCode7>7</trackingCode7>
                <trackingCode8>8</trackingCode8>
                <trackingCode9>9</trackingCode9>
                <trackingCode10>10</trackingCode10>
            </tracking>
            <repeat>
                <repeatType>DAILY</repeatType>
                <interval>1</interval>
            </repeat>
            <attendeeOptions>
                <emailInvitations>true</emailInvitations>
            </attendeeOptions>
        </bodyContent>
    </body>
</serv:message>`.replace(/(\r\n|\n|\r|\t|\s{2,})/gm, '');
// Remove tabs/spaces 2 or more/new line break
