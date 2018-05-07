'use strict';

module.exports = (req, res) => {
    const data = {
        title: 'Shopers - Login to your account from here',
        page: 'login',
        user: req.session
    };

    if (req.session && req.session.username) res.redirect('/');
    else res.render('login', data);
};