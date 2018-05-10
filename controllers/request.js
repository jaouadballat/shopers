'use strict';

const request = require('request');

const api_options = { server: 'http://127.0.0.1:5000' };
const render = (page, options, req, res) => res.render(page, options);

if (process.env.NODE_ENV === 'production') {
    api_options.server = 'https://sleepy-mesa-12188.herokuapp.com/';
}

exports.render = render;
exports.api_options = api_options;
exports.request = request;