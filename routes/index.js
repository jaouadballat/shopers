'use strict';

const router = require('express').Router();
//const index = require('../controllers/index');

router.route('/').get((req, res) => res.render('index'));

module.exports = router;
