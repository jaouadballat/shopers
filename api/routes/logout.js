'use strict';

const logout = require('../controllers/logout');

module.exports = router => {
	router.route('/logout')
		.get(logout.destroySession);
}