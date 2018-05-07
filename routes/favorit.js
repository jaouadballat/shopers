'use strict';

const router = require('express').Router();
const favorit = require('../controllers/favorit');

router.route('/:by?')
	.get(favorit);

module.exports = router;