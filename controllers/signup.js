'use strict';

module.exports = (req, res) => {
    const data = {
        title: 'Shopers - Create a new account here',
        page: 'signup',
        user: req.session
    };

   if (req.session && req.session.username) res.redirect('/');
    else res.render('signup', data);
};