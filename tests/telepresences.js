import test from 'ava';
import WebExClient from '.';

const webex = new WebExClient({
  siteID:
  partnerID: 999
  webExID: 'hostid'
});

test('Create a teleconference session', t => {
  const config = {
    accessControl: {
      listing: 'PUBLIC',
      sessionPassword: 12345
    },
    metaData: {
      confName: "Sample teleconference meeting"
    },
    fullAccessAttendees: [
      {
        name: 1,
        phones: {
          phone: '',
          mobilePhone: '',
          fax: ''
        }
      }
    ],
    limitedAccessAttendees: [
      {
        name: 2,
        phones: {
          phone: '',
          mobilePhone: '',
          fax: ''
        }
      }
    ],
    schedule: {
      startDate: '04/18/2005 15:08:51',
      timeZoneID: 45,
      entryExitTone: 'ANNOUNCENAME'
    },
    teleconference: {
      extTelephonyDescription: 'xml'
    },
    tracking: [ 1, 2, 3, 4, 5],
    attendeeOptions: {
      emailInvitations: true
    }
  }
});
