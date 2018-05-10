'use strict';

const mongoose = require('mongoose');
const readline = require('readline');
const db_uri = process.env.MONGOLAB_URI || 'mongodb://root:root@ds117010.mlab.com:17010/shopers';

mongoose.connect(db_uri);
var db = mongoose.connection;

if (process.platform === 'wind32') {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('SIGINT', _ => process.emit('SIGINT'));
}

process.on('SIGINT', _ => gracefulShutdown('app termination', _ => process.exit(0)));

//connection events
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connection ... Ok');
});

function gracefulShutdown(msg, callback) {
    mongoose.connection.close(_ => {
        console.log('Mongoose disconnected through ', msg);
        callback();
    })
}

//bring in the schemas and models
const users = require('./users');
const shops = require('./shops');
const favorits = require('./favorits');

module.exports = db;