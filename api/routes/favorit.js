'use strict';

const favorit = require('../controllers/favorit');

module.exports = router => {
    router.route('/favorit/:by')
        .get(favorit.get);

    router.route('/favorit')
        .put(favorit.update);
};