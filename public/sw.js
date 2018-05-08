'use strict';

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

workbox.setConfig({ debug: true });
workbox.skipWaiting();
workbox.clientsClaim();

const staticAssets = [
	{
		"url": "css/main.min.css",
		"revision": "b2315e3e93c68bd31cedb0df62d91ae1"
	},
	{
		"url": "js/main.min.js",
		"revision": "f3eff5b7dda8732e084e45f5d0a78088"
	}
];

workbox.precaching.precacheAndRoute(staticAssets);

workbox.routing.registerRoute(
	/.*\.css/,
	workbox.strategies.staleWhileRevalidate({
	cacheName: 'css-cache'
	})
);

workbox.routing.registerRoute(
	new RegExp('.*\.js'),
	workbox.strategies.staleWhileRevalidate({
	cacheName: 'js-cache'
	})
);

workbox.routing.registerRoute(
	/.*\.(?:png|jpg|jpeg|svg|gif|ico)/,
	workbox.strategies.staleWhileRevalidate({
	cacheName: 'image-cache',
	cacheExpiration: {
		maxEntries: 30
	},
	cacheableResponse: { statuses: [0, 200] }
	})
);

workbox.routing.registerRoute(
	new RegExp('.*\.html|/'),
	workbox.strategies.networkFirst({
		cacheName: 'html-cache'
	})
);
