'use strict';

const router = require('express').Router();

const login = require('./login')(router);
const signup = require('./signup')(router);

module.exports = router;