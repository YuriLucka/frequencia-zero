// Offline play for the installed game (design/frequencia-zero-cap2-design.md 5.1 and 8.3).
// Vite names the code with a hash that changes on each build, so the build itself writes
// BUILD and ASSETS below (vite.config.ts, the sw-manifest plugin): every file of the build
// is cached on install, during the first visit, and each build gets its own cache, so the
// page and its code always come from the same build. The lines stay valid on the dev
// server, where nothing is precached.
// Clara's recordings (audio/clara/) are not cached: they stream when present.
const BUILD = '82f436f7bad0';
const ASSETS = ["assets/index-Hv5AWPE4.js"];
const CACHE = 'fz-' + BUILD;
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll([...SHELL, ...ASSETS])).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))) // older builds, fz-plantao-v1
    .then(() => self.clients.claim()));
});
// Cache first: the cached page and code belong to one build. A new build arrives as a new
// sw.js (the browser checks it on each visit), which caches that build whole and takes over.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin || req.url.includes('/audio/')) return;
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req, { ignoreSearch: true });
    if (hit) return hit;
    const res = await fetch(req);
    if (res.ok) c.put(req, res.clone());
    return res;
  }));
});
