'use strict';

const signup = require('../controllers/signup');

module.exports = router => {
	router.route('/signup')
		.post(signup.userCreate);
}