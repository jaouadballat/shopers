'use strict';

const router = require('express').Router();
//const login = require('../controller/login');

router.route('/')
	.get((req, res) => res.render('login'));

module.exports = router;