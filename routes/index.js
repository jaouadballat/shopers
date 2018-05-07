'use strict';

const router = require('express').Router();
const index = require('../controllers/index');

router.route('/:by?')
    .get(index);

module.exports = router;
