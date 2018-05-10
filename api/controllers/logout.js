'use strict';

const jsonResponse = require('../utils/index').jsonResponse;

module.exports.destroySession = (req, res) => {
	if (req.session) {
		req.session.destroy(err => {
			if (err) jsonResponse(res, 400, err);
			else return res.redirect('/');
		});
	}
};