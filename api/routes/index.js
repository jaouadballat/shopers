'use strict';

const router = require('express').Router();

const login = require('./login')(router);
const signup = require('./signup')(router);
const shop = require('./shop')(router);

module.exports = router;