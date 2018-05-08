const mongoose = require('mongoose');
const Shop = mongoose.model('Shop');
const jsonResponse = require('../utils/index').jsonResponse;

module.exports.get = (req, res) => {
    const sort_by = req.params.by;

    Shop.find({
        liked: true
    })
        .where('deleted').equals(false)
        .sort(`-${sort_by}`)
        .select('name picture')
        .exec((err, shops) => {
            if (err) { jsonResponse(res, 400, err); }
            else if (!shops) { jsonResponse(res, 401, { 'message': 'Something went wrong' }); }
            else { jsonResponse(res, 200, shops) }
        });
};

module.exports.update = (req, res) => {
    console.log(req.body);
    const data = req.body;
    const card_id = data.id;
    if (!card_id) {jsonResponse(res, 404, { 'message': 'Not found, id required' });}
    else {
        Shop.findById(card_id)
            .select('-liked')
            .exec((err, card) => {
                if (!card) { jsonResponse(res, 404, { 'message': 'Card not found' }); }
                else if (err) { jsonResponse(res, 400, err); }
                else {card.liked = false;}

                card.save((err, card) => {
                    if (err) jsonResponse(res, 400, err);
                    else jsonResponse(res, 200, card);
                })
            });
    }
};