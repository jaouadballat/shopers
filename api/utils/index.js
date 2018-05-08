'use strict';

const jsonResponse = require('./json-response');
const hours = require('./hours');

exports.jsonResponse = jsonResponse;
exports.hours = hours;

exports.requiresLogin = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    } else {
        req.flash('info', 'You should login to interact');
        jsonResponse(res, 401, { 'message': 'You should login to interact' });
    }
}