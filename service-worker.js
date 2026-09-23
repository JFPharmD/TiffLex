// TiffLex — offline service worker
// Bump this version string any time you replace index.html so returning
// visitors pick up the new file instead of a stale cached copy.
const VERSION = 'v9';
const CACHE_NAME = 'tifflex-' + VERSION;

const PRECACHE_URLS = [
  './',
  './index.html',
  './welcome.html',
  './manifest.json',
  './favicon.ico',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './mark.svg',
  './mark-maskable.svg',
  './og-image.png',
  './screenshot-app.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => (name.startsWith('tifflex-') || name.startsWith('umpje-cram-prep-')) && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  if (sameOrigin) {
    // App shell: cache-first so it always opens instantly offline,
    // and quietly refresh the cache in the background when online.
    event.respondWith(
      caches.match(req).then((cached) => {
        const network = fetch(req).then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return res;
        }).catch(() => cached);
        return cached || network;
      })
    );
  } else {
    // Google Fonts etc: try the network first, fall back to whatever was
    // cached from an earlier online visit, and cache successful fetches.
    event.respondWith(
      fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return res;
      }).catch(() => caches.match(req))
    );
  }
});
