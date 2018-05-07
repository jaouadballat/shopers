'use strict';

const request = require('./request');

module.exports = (req, res) => {
    console.log(req.session);

    let params;
    if (req.params.by !== undefined) params = req.params.by;
    else params = 'name';

    let path = '/api/shop';
    let request_option = {
        url: request.api_options.server + path + '/' + params,
        method: 'GET',
        json: {},
        qs: {}
    };

    request.request(request_option, (err, response, body) => {
        if (err) {
            console.log(err);
            return;
        }

        const options = {
            title: 'Shopers - your favorite nearby shop',
            page: 'index',
            filter: params,
            user: req.session,
            shops: body
        };

        request.render('index', options, req, res);
    });
};