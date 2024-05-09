const cacheName = 'offline-link';
const offlinePage = 'offline.html';
const assets = [
  '/link/',
  '/link/style.css',
  '/link/script.js',
  '/link/favicon.png',
  '/link/font.woff2',
];

self.addEventListener('install', event =>
  {
  event.waitUntil(
    caches.open(cacheName).then(cache =>
      {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', event =>
  {
  event.respondWith(
    caches.match(event.request).then(response =>
      {
      return response || fetch(event.request);
      }).catch(() =>
      {
      return caches.match(offlinePage);
    })
  );
});
