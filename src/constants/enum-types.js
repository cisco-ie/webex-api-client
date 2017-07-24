// @TODO: When https://github.com/cisco-ie/webex-enum-types is public, use this instead
module.exports = {
	addressType: ['PERSONAL', 'GLOBAL'],
	assistConfirm: ['Pending', 'Confirmed', 'Cancelled'],
	assistRequest: ['None', 'Dry Run', 'Consult', 'Live Event Support', 'Audio Streaming', 'Video'],
	day: ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
	entryExitTone: ['BEEP', 'NOTONE', 'ANNOUNCENAME'],
	joinStatus: ['REGISTER', 'INVITE', 'REJECT', 'ACCEPT'],
	listMethod: ['AND', 'OR'],
	listStatus: ['PUBLIC', 'PRIVATE', 'UNLISTED'],
	orderBy: ['HOSTNAME', 'STATUS'],
	orderAD: ['ASC', 'DESC'],
	personType: ['VISITOR', 'MEMBER', 'PANELIST', 'SME', 'SALESTEAM'],
	registrationStatus: ['FULL', 'CLOSED', 'WAITLIST', 'REGISTER'],
	repeatType: ['WEEKLY', 'DAILY', 'NO_REPEAT', 'CONSTANT', 'MONTHLY', 'YEARLY'],
	role: ['ATTENDEE', 'PRESENTER', 'HOST', 'LIMITED']
};
