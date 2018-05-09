'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jsonResponse = require('../utils/index').jsonResponse;

module.exports.userCreate = (req ,res) => {
	console.log(req.body);
	const data = req.body;

	if (data.password !== data.repassword) {
		jsonResponse(res, 400, {'message': 'Passwords do not match.'});
	} else {
		if (data.username && data.email && data.password && data.repassword) {
			const user_data = {
				username: data.username,
				email: data.email,
			};

			User.createUser(res, data.email, _ => {
				bcrypt.hash(data.password, 10, (err, hash) => {
					if (err) {
						jsonResponse(res, 400, {'message': 'Something went wrong.'});
					};

					user_data.password = hash;
					User.create(user_data, (err, user) => {
						if (err) jsonResponse(res, 400, err);
						else jsonResponse(res, 200, {'message': 'ok'});
					});			
				});
			});
		} else {
			jsonResponse(res, 400, {'message': 'All fields required.'});
		}
	}
};
