/* RC-FINDER Offline PWA: static app-shell only, no GPS data stored. */
'use strict';
const CACHE_NAME = 'rcfinder-gps-offline-v1-20261019';
const CACHE_PREFIX = 'rcfinder-gps-offline-';
const ROOT = self.registration.scope;
const SHELL = ['./', './index.html', './manifest.webmanifest',
               './icons/icon-192.png', './icons/icon-512.png']
              .map(path => new URL(path, ROOT).href);

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(SHELL); // fail install rather than advertise a broken offline cache
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
                          .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if(request.method !== 'GET') return; // do not intercept GPS destination HTTP GET
  const url = new URL(request.url);
  const scope = new URL(ROOT);
  if(url.origin !== scope.origin || !url.pathname.startsWith(scope.pathname)) return;
  if(request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const shell = await cache.match(new URL('./index.html', ROOT).href);
      if(shell) return shell; // offline-first, including cache-busting query parameters
      try { return await fetch(request); }
      catch { return new Response('RC-FINDER 尚未安裝離線快取', {status:503,headers:{'content-type':'text/plain; charset=utf-8'}}); }
    })());
    return;
  }
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if(cached) return cached;
    return fetch(request); // same-origin assets only; never cache personal GPS values
  })());
});
