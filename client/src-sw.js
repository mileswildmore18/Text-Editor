const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

//Adding page cache configuration
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Cache lasts for 30 days
    }),
  ],
});


// Warming up the cache with important pages
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Registers the route for navigation requests (HTML Pages)
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Gives Asset cache configuration for CSS, JS, and Images
const assetCache = new StaleWhileRevalidate({
  cacheName: 'asset-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, //Cache lasts for 30 days
      maxEntires: 60, // 60 = Maximum number of entries to cache
    }),
  ],
});

// This registers the route for CSS, JS, and Images
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image',
  assetCache
);
