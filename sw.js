/**
 * @file sw.js — Service Worker for DeepDiveNRG PWA.
 *
 * Strategy: network-first with cache fallback.
 * Bump CACHE_NAME when deploying breaking asset changes to invalidate old caches.
 * Old caches are purged during the activate event.
 */

/** @type {string} Unique cache key for this build. Increment the version suffix on each deploy. */
const CACHE_NAME = 'deepdivenrg-v6';

/**
 * App-shell assets pre-cached during service-worker installation.
 * These are the minimum files required to render any page offline.
 * Content pages (page1–3) are cached automatically on first visit
 * via the network-first strategy below.
 * @type {string[]}
 */
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './config.js',
  './manifest.json',
  './icons/icon-192.svg',
  './icons/icon-512.svg',
  './icons/icon-maskable.svg',
];

// ===== Install — cache shell assets =====
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .catch((err) => console.error('[SW] Pre-cache failed:', err))
  );
  self.skipWaiting();
});

// ===== Activate — clean old caches =====
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      )
    ).catch((err) => console.error('[SW] Cache cleanup failed:', err))
  );
  self.clients.claim();
});

// ===== Fetch — network first, fall back to cache =====
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request)
      .then((response) => {
        if (!response || !response.ok) return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
