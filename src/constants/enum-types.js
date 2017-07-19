// @TODO: When https://github.com/cisco-ie/webex-enum-types is public, use this instead
module.exports = {
	addressType: ['PERSONAL', 'GLOBAL'],
	assistConfirm: ['Pending', 'Confirmed', 'Cancelled'],
	assistRequest: ['None', 'Dry Run', 'Consult', 'Live Event Support', 'Audio Streaming', 'Video'],
	entryExitTone: ['BEEP', 'NOTONE', 'ANNOUNCENAME'],
	joinStatus: ['REGISTER', 'INVITE', 'REJECT', 'ACCEPT'],
	listStatus: ['PUBLIC', 'PRIVATE', 'UNLISTED'],
	personType: ['VISITOR', 'MEMBER', 'PANELIST', 'SME', 'SALESTEAM'],
	registrationStatus: ['FULL', 'CLOSED', 'WAITLIST', 'REGISTER'],
	role: ['ATTENDEE', 'PRESENTER', 'HOST', 'LIMITED']
};
