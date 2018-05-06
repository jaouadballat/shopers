'use strict';

const mongoose = require('mongoose');
const Shop = mongoose.model('Shop');
const jsonResponse = require('../utils/index').jsonResponse;
const file_upload = require('../utils/upload');

module.exports.get = (req, res) => {
	const sort_by = req.query.by;

	//remove 2 hours from nows date
	const disliked_expired = new Date();
	disliked_expired.setHours(disliked_expired.getHours() - 2);

	Shop.find({
		liked: false
	})
	.where('disliked').lt(disliked_expired)
	.where('deleted').equals(false)
	.sort(`-${sort_by}`)
	.select('name picture')
	.exec((err, shops) => {
		if (err) {jsonResponse(res, 400, err);} 
		else if (!shops) {jsonResponse(res, 401, {'message': 'Something went wrong'});} 
		else {jsonResponse(res, 200, shops)}
	});
};

module.exports.set = (req, res) => {
	const data = req.body;

	// file_upload(req, res, err => {
	// 	if (err) {jsonResponse(res, 400, err);}
	// 	else {
	// 		if (req.file === 'undefined') {
	// 			jsonResponse(res, 401, {'message': 'No file Selected'});
	// 		} else {
	// 			Shop.create({
	// 				name: data.name,
	// 				author: data.author,
	// 				picture: req.file.filename,
	// 				distance: data.distance,
	// 				deleted: false,
	// 				liked: false,
	// 				disliked: new Date().getHours()
	// 			}, (err, shop) => {
	// 				if (err) jsonResponse(res, 400, err);
	// 				else jsonResponse(res, 201, shop);
	// 				//return res.redirect('/');
	// 			});
	// 		}
	// 	}
	// });

	Shop.create({
		name: data.name,
		author: data.author,
		//picture: req.file.filename,
		picture: req.picture,
		distance: data.distance,
		deleted: false,
		liked: false,
		disliked: new Date()
	}, (err, shop) => {
		if (err) jsonResponse(res, 400, err);
		else jsonResponse(res, 201, shop);
		//return res.redirect('/');
	});
};

module.exports.update = (req, res) => {};
module.exports.updateLike = (req, res) => {};
module.exports.delete = (req, res) => {};