'use strict';

const router = require('express').Router();
//const signup = require('../controller/signup');

router.route('/')
	.get((req, res) => res.render('signup'));

module.exports = router;