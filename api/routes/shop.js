'use strict';

const shop = require('../controllers/shop');

module.exports = router => {
	router.route('/shop/:by')
		.get(shop.get);

	router.route('/shop')
		.post(shop.set)
		.put(shop.update)
		.delete(shop.delete);

	router.route('/shop/:like')
		.put(shop.updateLike);
};