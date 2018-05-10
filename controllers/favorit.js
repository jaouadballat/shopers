'use strict';

const request = require('./request');

module.exports = (req, res) => {
    let params;
    if (req.params.by !== undefined) params = req.params.by;
    else params = 'distance';

    let path = '/api/favorit';
    let request_option = {
        url: request.api_options.server + path + '/' + params,
        method: 'GET',
        json: {},
        qs: {'user_id': req.session.user_id}
    };

    request.request(request_option, (err, response, body) => {
        if (err) {
            console.log(err);
            return;
        }

        const options = {
            title: 'Shopers - your favorite shops',
            page: 'favorit',
            filter: params,
            user: req.session,
            shops: body
        };

        request.render('favorit', options, req, res);
    });
};