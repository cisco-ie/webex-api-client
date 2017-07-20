// @TODO: Automate with requireAll
module.exports = {
	accessControl: require('./body/access-control'),
	assistService: require('./body/assist-service'),
	schedule: require('./body/schedule'),
	securityContext: require('./header/security-context'),
	supportCenter: require('./body/support-center'),
	participants: require('./body/participants'),
	tracking: require('./body/tracking'),
	remind: require('./body/remind'),
	repeat: require('./body/repeat')
};
