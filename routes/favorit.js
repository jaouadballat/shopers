'use strict';

const router = require('express').Router();
//const favorit = require('../controller/favorit');

router.route('/')
	.get((req, res) => res.render('favorit'));

module.exports = router;