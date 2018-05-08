'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonResponse = require('../utils/index').jsonResponse;

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true, 
	},
	passwordConf: {
	    type: String,
	}
});

userSchema.statics.authenticate = (email, password, callback) => {
	User.findOne({email: email})
		.exec((err, user) => {
			if (err) return callback(err);
			else if (!user) return callback(err);

			bcrypt.compare(password, user.password, (err, result) => {
				if (result === true) return callback(null, user);
				else return callback();
			});
		});
};

userSchema.statics.createUser = (res, email, callback) => {
	User.findOne({email: email})
		.exec((err, user) => {
			if (user) {
				jsonResponse(res, 400, {'message': 'Email already exists.'});
			} else {
				callback();
			}
		});
};

const User = mongoose.model('User', userSchema);
module.exports = User;