const CACHE='bill-demo-v20';
const ASSETS=['./','./index.html','./style.css','./app.js','./manifest.json','./assets/bills-data.js','./assets/loading.gif','./assets/back.png','./assets/back0.png','./assets/more.png','./assets/more0.png','./assets/search.png','./assets/search0.png','./assets/triangle.png','./assets/triangle-up.png','./assets/arrow-down.png','./assets/arrow-right.png','./assets/up.png','./assets/down.png','./assets/info.png','./assets/merchant.png','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('bill-demo-')&&key!==CACHE).map(key=>caches.delete(key))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
