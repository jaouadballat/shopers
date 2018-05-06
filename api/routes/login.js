'use strict';

const login = require('../controllers/login');

module.exports = router => {
	router.route('/login')
		.post(login.userAuthenticate);
}