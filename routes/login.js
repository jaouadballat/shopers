'use strict';

const router = require('express').Router();
const login = require('../controllers/login');

router.route('/')
	.get(login.get)
	.post(login.post);

module.exports = router;