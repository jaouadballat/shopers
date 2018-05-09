const mongoose = require('mongoose');
const Shop = mongoose.model('Shop');
const Favorit = mongoose.model('Favorit');
const jsonResponse = require('../utils/index').jsonResponse;

module.exports.get = (req, res) => {
    const sort_by = req.params.by;
    const user_id = req.query.user_id;

    Shop.find()
        .where('deleted').equals(false)
        .sort(`-${sort_by}`)
        .select('name picture')
        .exec((err, shops) => {
            if (err) { jsonResponse(res, 400, err); }
            else if (!shops) { jsonResponse(res, 401, { 'message': 'Something went wrong' }); }
            else {
                if (user_id) {
                    shops.forEach(shop => Favorit.add(user_id, shop._id));

                    const user_shops = [];
                    let counter = 1;
                    shops.filter(shop => {
                        Favorit.filterBy(true, user_id, shop._id, bool => {
                            if (bool) user_shops.push(shop);
                            if (counter === shops.length) jsonResponse(res, 200, user_shops);
                            counter++;
                        });
                    });
                }
            }
        });
};

module.exports.update = (req, res) => {
    const data = req.body;
    const card_id = data.id;
    const user_id = data.user_id;
    if (!card_id) jsonResponse(res, 404, { 'message': 'Not found, id required' });
    else Favorit.addInteraction(res, user_id, card_id, data, true);
};