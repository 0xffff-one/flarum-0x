importScripts('https://cdn.jsdelivr.net/npm/workbox-sw@4.3.1/build/workbox-sw.min.js');
if (workbox) {
  console.log(`Workbox is loaded`);
} else {
  console.log(`Workbox didn't load`);
}

// workbox.setConfig({ debug: true });

workbox.routing.registerRoute(
  '/',
  async args => {
    return await new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'index-cache',
    }).handle({
      request: new Request('/app-shell')
    });
  }
);

workbox.routing.registerRoute(
  '/app-shell',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'index-cache',
  })
);

workbox.routing.registerRoute(
  /^(?:https:\/\/0xffff-cdn\.iscnu\.net)\/.*\.(?:css|js|woff|woff2|eot|ttf)$/,
  new workbox.strategies.CacheFirst({
    // Use a custom cache name.
    cacheName: 'cdn-cache',
  })
);

workbox.routing.registerRoute(
  // Cache CSS files.
  /\.(?:css|js)$/,
  // Use cache but update in the background.
  new workbox.strategies.StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: 'css-js-cache',
  })
);

workbox.routing.registerRoute(
  // Cache image files.
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  // Use the cache if it's available.
  new workbox.strategies.CacheFirst({
    // Use a custom cache name.
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);

workbox.googleAnalytics.initialize();
