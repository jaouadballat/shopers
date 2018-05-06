'use strict';

const mongoose = require('mongoose');
const db_uri = 'mongodb://root:root@ds117010.mlab.com:17010/shopers';
let gracefulShutdown;

mongoose.connect(db_uri);

// CONNECTION EVENTS
mongoose.connection.on('connected', _ => {
    console.log('Mongoose connected to ' + db_uri);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', _ => {
    console.log('Mongoose disconnected');
});

// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(_ => {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', _ => {
    gracefulShutdown('nodemon restart', _ => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', _ => {
    gracefulShutdown('app termination', _ => {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', _ => {
    gracefulShutdown('Heroku app termination', _ => {
        process.exit(0);
    });
});

// BRING IN YOUR SCHEMAS & MODELS
const users = require('./users');
const shops = require('./shops');

module.exports = db_uri;