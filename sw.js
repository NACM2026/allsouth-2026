/* All South 2026 — service worker
   Bump CACHE when you change index.html or data.js so phones pick it up. */
const CACHE = 'as26-v4';

const SHELL = [
  './',
  'index.html',
  'logos.js',
  'data.js',
  'manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;

  const url = new URL(req.url);

  // Never cache the roster CSV — it must be live.
  if(url.hostname.includes('docs.google.com') || url.hostname.includes('googleusercontent')) return;

  // Same-origin app files: network first, fall back to cache when offline.
  if(url.origin === location.origin){
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then(hit => hit || caches.match('index.html')))
    );
  }
});
