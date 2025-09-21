const CACHE_NAME = 'cable-inventory-cache-v1';
const urlsToCache = [
  './inventory_manager.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://placehold.co/192x192/4f46e5/ffffff?text=Inv',
  'https://placehold.co/512x512/4f46e5/ffffff?text=Inv'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
