// Offline play for the installed game (design/frequencia-zero-cap2-design.md 5.1 and 8.3).
// Vite names the code with a hash that changes on each build, so the build itself writes
// BUILD and ASSETS below (vite.config.ts, the sw-manifest plugin): every file of the build
// is cached on install, during the first visit, and each build gets its own cache, so the
// page and its code always come from the same build. The lines stay valid on the dev
// server, where nothing is precached.
// The recorded voices (audio/) are in ASSETS too, so the installed game speaks offline.
const BUILD = '2647a3c68649';
const ASSETS = ["assets/index-C6hv5zlG.js","audio/boletim.mp3","audio/clara/c2_clara_01.mp3","audio/clara/c2_clara_02.mp3","audio/clara/c2_clara_03.mp3","audio/clara/c2_clara_04.mp3","audio/clara/c2_clara_06.mp3","audio/clara/c3_clara_01.mp3","audio/clara/c3_clara_02.mp3","audio/clara/c3_clara_03.mp3","audio/clara/c3_clara_04.mp3","audio/clara/c3_clara_05.mp3","audio/clara/c3_clara_06.mp3","audio/clara/c4_clara_01.mp3","audio/clara/c4_clara_02.mp3","audio/clara/c4_clara_03.mp3","audio/clara/c4_clara_04.mp3","audio/clara/c5_clara_01.mp3","audio/clara/c5_clara_02.mp3","audio/clara/c5_clara_03.mp3","audio/clara/c5_clara_04.mp3","audio/clara/c5_clara_05.mp3","audio/clara/c5_clara_06.mp3","audio/clara/clara_01.mp3","audio/clara/clara_02.mp3","audio/clara/clara_03.mp3","audio/clara/clara_04.mp3","audio/clara/clara_05.mp3","audio/clara/clara_06.mp3","audio/hospital/desp_01.mp3","audio/hospital/desp_02.mp3","audio/hospital/desp_03.mp3","audio/hospital/desp_04.mp3"];
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
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req, { ignoreSearch: true });
    const range = req.headers.get('Range');
    if (hit) return range ? partial(hit, range) : hit;
    const res = await fetch(req);
    if (res.status === 200) c.put(req, res.clone()); // a 206 (a slice of audio) cannot be cached
    return res;
  }));
});

// A media element asks for its audio in byte ranges ("bytes=start-end"); Safari plays it only from a
// 206 answer, so a cached voice is sliced (design/frequencia-zero-vozes-design.md 5).
async function partial(res, range) {
  const m = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
  if (!m) return res;
  const buf = await res.arrayBuffer(), total = buf.byteLength;
  let start = m[1] === '' ? total - Number(m[2]) : Number(m[1]);
  let end = m[1] !== '' && m[2] !== '' ? Number(m[2]) : total - 1;
  start = Math.max(0, start); end = Math.min(end, total - 1);
  if (start > end) return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${total}` } });
  return new Response(buf.slice(start, end + 1), { status: 206, headers: {
    'Content-Type': res.headers.get('Content-Type') || 'audio/mpeg', 'Content-Range': `bytes ${start}-${end}/${total}`,
    'Content-Length': String(end - start + 1), 'Accept-Ranges': 'bytes' } });
}
