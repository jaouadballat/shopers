'use strict';

module.exports = (req, stat, message) => {
    req.flash(stat, message);
}