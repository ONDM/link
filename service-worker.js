const cacheName = 'link-cache-v2';

self.addEventListener('install', (event) =>
{
  console.log('Service Worker Installed');
  event.waitUntil(
    caches.open(cacheName).then((cache) =>
    {
      return cache.addAll([
        '/link/',
        '/link/manifest.json',
        '/link/style.css',
        '/link/favicon.png',
        '/link/sw.js',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) =>
{
  event.respondWith(
  caches.match(event.request).then((response) =>
  {
    return response || fetch(event.request);
  })
  );
});
