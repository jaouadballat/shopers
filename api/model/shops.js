'use strict';

const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	author: String,
	picture: String,
	disliked: Date,
	liked: Boolean,
	distance: Number,
	deleted: Boolean,
});

const Shop = mongoose.model('Shop', shopSchema);
module.exports = Shop;