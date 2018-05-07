'use strict';

module.exports =  {
    add: _ => {
        const disliked = new Date();
        disliked.setHours(disliked.getHours() + 2);

        return disliked;
    },

    remove: _ => {
        const expired = new Date();
        expired.setHours(expired.getHours() - 2);

        return expired;
    }
};