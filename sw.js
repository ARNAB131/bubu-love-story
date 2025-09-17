const CACHE = 'stories-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))) );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(resp=>{
      // cache GETs
      if(req.method==='GET' && resp.ok){
        const copy = resp.clone();
        caches.open(CACHE).then(c=>c.put(req, copy));
      }
      return resp;
    }).catch(()=> {
      // offline fallback for navigation
      if(req.mode==='navigate') return caches.match('./index.html');
    }))
  );
});
