'use strict';

const jsonResponse = require('../utils/index').jsonResponse;

module.exports.destroySession = (res, res) => {
	//session exists then destroy it.
	if (req.session) {
		req.session.destory(err => {
			if (err) {jsonResponse(res, 400, err);}
			else {return res.redirect('/');}
		});
	}
};