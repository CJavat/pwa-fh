// Imports
importScripts("js/sw-utils.js");

const STATIC_CACHE = "static-v1";
const DYNAMIC_CACHE = "dynamic-v1";
const INMUTABLE_CACHE = "inmutable-v1";

const APP_SHELL = [
  "/",
  "index.html",
  "style/bg.png",
  "style/plain_sign_in_blue.png",
  "style/base.css",
  "js/app.js",
  "js/base.js",
  "js/sw-utils.js",
];

const APP_SHELL_INMUTABLE = [
  "https://cdn.jsdelivr.net/npm/pouchdb@9.0.0/dist/pouchdb.min.js",
];

self.addEventListener("install", (e) => {
  const cacheStatic = caches
    .open(STATIC_CACHE)
    .then((cache) => cache.addAll(APP_SHELL));

  const cacheInmutable = caches
    .open(INMUTABLE_CACHE)
    .then((cache) => cache.addAll(APP_SHELL_INMUTABLE));

  e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});

self.addEventListener("activate", (e) => {
  const respuesta = caches.keys().then((keys) => {
    keys.forEach((key) => {
      if (key !== STATIC_CACHE && key.includes("static")) {
        return caches.delete(key);
      }
      if (key !== DYNAMIC_CACHE && key.includes("dynamic")) {
        return caches.delete(key);
      }
    });
  });

  e.waitUntil(respuesta);
});

self.addEventListener("fetch", (e) => {
  const respuesta = caches.match(e.request).then((res) => {
    if (res) return res;

    return fetch(e.request).then((newRes) => {
      return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);
    });
  });

  e.respondWith(respuesta);
});
