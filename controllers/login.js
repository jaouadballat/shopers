'use strict';

const request = require('./request');
const flashing = require('../utils/index').flashing;

module.exports = {
    get: (req, res) => {
        const data = {
            title: 'Shopers - Login to your account from here',
            page: 'login',
            user: req.session
        };

        if (req.session && req.session.username) res.redirect('/');
        else res.render('login', data);
    },

    post: (req, res) => {
        let path = '/api/login';
        let request_option = {
            url: request.api_options.server + path,
            method: 'POST',
            form: req.body,
        };

        request.request(request_option, (err, response, body) => {
            if (err) {
                console.log(err);
                return;
            }

            const parsed_body = JSON.parse(body);

            if (parsed_body.message === 'ok') {
                req.session.user_id = parsed_body.user_id;
                req.session.username = parsed_body.username;

                res.redirect('/'); 
            }
            else {
                flashing(req, 'error', parsed_body.message)
                res.redirect('login');
            }
        });
    }
}