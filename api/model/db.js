'use strict';

const mongoose = require('mongoose');
const db_uri = 'mongodb://root:root@ds117010.mlab.com:17010/shopers';
let gracefulShutdown;

mongoose.connect(db_uri);
var db = mongoose.connection;

// CONNECTION EVENTS
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connection ... Ok');
});

// BRING IN YOUR SCHEMAS & MODELS
const users = require('./users');
const shops = require('./shops');

module.exports = db;