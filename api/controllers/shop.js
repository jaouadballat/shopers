'use strict';

const mongoose = require('mongoose');
const Shop = mongoose.model('Shop');
const Favorit = mongoose.model('Favorit');
const jsonResponse = require('../utils/index').jsonResponse;
const hours = require('../utils/index').hours;
const file_upload = require('../utils/upload');

module.exports.get = (req, res) => {
	const sort_by = req.params.by;
	const user_id = req.query.user_id;

	Shop.find()
		.where('deleted').equals(false)
		.sort(`-${sort_by}`)
		.select('name picture')
		.exec((err, shops) => {
			if (err) {jsonResponse(res, 400, err);}
			else if (!shops) {jsonResponse(res, 401, {'message': 'Something went wrong' });}
			else {
				if (user_id) {
					shops.forEach(shop => Favorit.add(user_id, shop._id));

					const user_shops = [];
					let counter = 1;
					shops.filter(shop => {
						Favorit.filterBy(false, user_id, shop._id, bool => {
							if (bool) user_shops.push(shop);
							if (counter === shops.length) jsonResponse(res, 200, user_shops);
							counter++;
						});
					});
				} else {
					jsonResponse(res, 200, shops);
				}
			}
		});
};

module.exports.set = (req, res) => {
	const data = req.body;

	file_upload(req, res, err => {
		if (err) { jsonResponse(res, 400, err); }
		else {
			if (req.file === 'undefined') {
				jsonResponse(res, 401, { 'message': 'No file Selected' });
			} else {
				Shop.create({
					name: data.name,
					author: data.author,
					picture: req.file.filename,
					distance: data.distance,
					deleted: false,
					liked: false,
					disliked: new Date()
				}, (err, shop) => {
					if (err) jsonResponse(res, 400, err);
					else jsonResponse(res, 201, shop);
				});
			}
		}
	});
};

module.exports.updateLike = (req, res) => {
	const data = req.body;
	const card_id = data.id;
	const user_id = data.user_id;
	if (!card_id) jsonResponse(res, 404, { 'message': 'Not found, id required' });
	else Favorit.addInteraction(res, user_id, card_id, data, false);
};

module.exports.update = (req, res) => {};
module.exports.delete = (req, res) => {};