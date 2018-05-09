'use strict';

const router = require('express').Router();
const signup = require('../controllers/signup');

router.route('/')
	.get(signup.get)
	.post(signup.post);

module.exports = router;