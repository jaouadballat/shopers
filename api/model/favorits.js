'use strict';

const mongoose = require('mongoose');
const hours = require('../utils/index').hours;
const jsonResponse = require('../utils/index').jsonResponse;

const favoritSchema = mongoose.Schema({
    user_id: String,
    shop_id: String,
    disliked: Date,
    liked: Boolean,
});

favoritSchema.statics.filterBy = (status, user_id, shop_id, callback) => {
    Favorit.findOne({
        'liked': status,
        'user_id': user_id,
        'shop_id': shop_id
    }, (err, shop) => {
        if (shop) {
            if (new Date().valueOf() < shop.disliked.valueOf()) callback(false);
            else callback(true);
        }else {
            callback(false);
        }
    });
};

favoritSchema.statics.add = (user_id, shop_id) => {
    Favorit.findOne({'user_id': user_id, 'shop_id': shop_id}, (err, shop) => {
        if (!shop) {
            Favorit.create({
                user_id: user_id,
                shop_id: shop_id,
                liked: false,
                disliked: new Date()
            }, (err, _shop) => {});
        }
    });
};

favoritSchema.statics.addInteraction = (res, user_id, card_id, data, update) => {
    Favorit.findOne({'shop_id': card_id, 'user_id': user_id})
        .select('liked disliked')
        .exec((err, card) => {
            if (!card) {jsonResponse(res, 404, { 'message': 'Card not found' });}
            else if (err) {jsonResponse(res, 400, err);}
            else {
                if (update) {
                    card.liked = false;
                } else {
                    if (data.like !== undefined) {
                        if (card.liked) card.liked = false;
                        else card.liked = true;
                    } else if (data.disliked !== undefined) {
                        card.disliked = hours.add();
                    }
                }

                card.save((err, card) => {
                    if (err) jsonResponse(res, 400, err);
                    else jsonResponse(res, 200, card);
                });
            }
        });
};

const Favorit = mongoose.model('Favorit', favoritSchema);
module.exports = Favorit;