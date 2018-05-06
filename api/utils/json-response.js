'use strict';

module.exports = (res, status, content) => {
		res.status(status);
	  	return res.json(content);
};