'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const jsonResponse = require('../utils/index').jsonResponse;

module.exports.userAuthenticate = (req, res) => {
	const data = req.body;

	if (data.email && data.password) {
		User.authenticate(data.email, data.password, (err, user) => {
			if (err || !user) {
				jsonResponse(res, 401, {'message': 'Wrong email or password.'});
			} else {
				const data = {
					'message': 'ok',
					'user_id': user._id,
					'username': user.username
				};
				jsonResponse(res, 200, data);
			}
		});
	} else {
		jsonResponse(res, 400, {'message': 'All fields required.'});
	}
};