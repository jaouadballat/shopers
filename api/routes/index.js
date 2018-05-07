'use strict';

const router = require('express').Router();

const login = require('./login')(router);
const signup = require('./signup')(router);
const logout = require('./logout')(router);
const shop = require('./shop')(router);
const favorit = require('./favorit')(router);

module.exports = router;