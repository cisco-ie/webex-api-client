// @TODO: Automate with requireAll
module.exports = {
	accessControl: require('./body/access-control'),
	assistService: require('./body/assist-service'),
	fullAccessAttendees: require('./body/attendees-mapper'),
	limitedAccessAttendees: require('./body/attendees-mapper'),
	order: require('./body/order'),
	participants: require('./body/participants'),
	remind: require('./body/remind'),
	repeat: require('./body/repeat'),
	schedule: require('./body/schedule'),
	securityContext: require('./header/security-context'),
	supportCenter: require('./body/support-center'),
	tracking: require('./body/tracking')
};
