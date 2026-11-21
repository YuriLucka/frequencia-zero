// PROTOTYPE - NOT FOR PRODUCTION
// Question: Ao chegar no Continua…, o jogador pensa quero jogar o resto?
// Date: 2026-11-21
// Offline play for the installed game. Every file is served from the cache at once and
// refreshed from the network behind it, so a new version arrives on the next launch.
// Clara's recordings (audio/clara/) are not cached: they stream when present.
const CACHE = 'fz-plantao-v1';
const FILES = ['./', 'index.html', 'config.js', 'falas.js', 'vendor/three.js', 'manifest.webmanifest',
  'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin || req.url.includes('/audio/')) return;
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
    return hit || net;
  }));
});
