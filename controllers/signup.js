'use strict';

const request = require('./request');
const flashing = require('../utils/index').flashing;

module.exports = {
    get: (req, res) => {
        const data = {
            title: 'Shopers - Create a new account here',
            page: 'signup',
            user: req.session
        };

        if (req.session && req.session.username) res.redirect('/');
        else res.render('signup', data);
    },

    post: (req, res) => {
        let path = '/api/signup';
        let request_option = {
            url: request.api_options.server + path,
            method: 'POST',
            form: req.body,
        };

        request.request(request_option, (err, response, body) => {
            if (err) {
                flashing(req, 'error', err);
                return;
            }

            const parsed_body = JSON.parse(body);

            if (parsed_body.message === 'ok') {res.redirect('login');}
            else {
                flashing(req, 'error', parsed_body.message)
                res.redirect('signup');
            }
        });
    }
}