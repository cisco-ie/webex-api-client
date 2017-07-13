// Maybe automate this some how?
module.exports = {
	accessControl: require('./body/access-control'),
	schedule: require('./body/schedule'),
	securityContext: require('./header/security-context'),
	supportCenter: require('./body/support-center')
};
