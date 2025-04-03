// const CACHE_NAME = "cache-1";
const CACHE_STATIC_NAME = "static-v2";
const CACHE_DYNAMIC_NAME = "dynamic-v1";
const CACHE_INMUTABLE_NAME = "inmutable-v1";
const CACHE_DYNAMIC_LIMIT = 50;

function limpiarCache(cacheName, numeroItems) {
  caches.open(cacheName).then((cache) => {
    return cache.keys().then((keys) => {
      if (keys.length >= numeroItems) {
        console.log({ keys });
        cache.delete(keys[0]).then(limpiarCache(cacheName, numeroItems - 1));
      }
    });
  });
}

self.addEventListener("install", (e) => {
  const cacheProm = caches.open(CACHE_STATIC_NAME).then((cache) => {
    return cache.addAll([
      "/",
      "/index.html",
      "/css/style.css",
      "/img/main.jpg",
      "/img/no-img.jpg",
      "/js/app.js",
    ]);
  });

  const cacheInmutable = caches
    .open(CACHE_INMUTABLE_NAME)
    .then((cache) =>
      cache.add(
        "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
      )
    );

  e.waitUntil(Promise.all([cacheInmutable, cacheProm]));
});

self.addEventListener("fetch", (e) => {
  //? 1- Cache Only
  // e.respondWith(caches.match(e.request));

  //? 2- Cache With Network Fallback
  // const respuesta = caches.match(e.request).then((res) => {
  //   if (res) return res;

  //   // No existe el archivo -> Tengo que ir a la web
  //   console.log("No existe", e.request.url);

  //   return fetch(e.request).then((newResp) => {
  //     cache.open(CACHE_DYNAMIC_NAME).then((cache) => {
  //       cache.put(e.request, newResp);
  //       limpiarCache(CACHE_DYNAMIC_NAME, 50);
  //     });

  //     return newResp;
  //   });
  // });

  //? 3- Network With Cache Fallback
  // const respuesta = fetch(e.request)
  //   .then((res) => {
  //     if (!res) return caches.match(e.request);

  //     caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
  //       cache.put(e.request, res);
  //       limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
  //     });

  //     return res.clone();
  //   })
  //   .catch((err) => {
  //     return caches.match(e.request);
  //   });

  //? 4-  Cache With Network Update -> Rendimiento es crítico | Siempre estará un paso atrás.
  // if (e.request.url.includes("bootstrap")) {
  //   return e.respondWith(caches.match(e.request));
  // }

  // const respuesta = caches.open(CACHE_STATIC_NAME).then((cache) => {
  //   fetch(e.request).then((newRes) => cache.put(e.request, newRes));

  //   return cache.match(e.request);
  // });

  //? 5- Cache & Network Race
  const respuesta = new Promise((resolve, reject) => {
    let rechazada = false;

    const falloUnaVez = () => {
      if (rechazada) {
        if (/\.(png|jpg)$/i.test(e.reques.url)) {
          resolve(caches.match("/img/no-img.jpg"));
        }
      } else {
        reject("No se encontró respuesta");
      }
    };

    fetch(e.request)
      .then((res) => {
        res.ok ? resolve(res) : falloUnaVez();
      })
      .catch(falloUnaVez);

    caches
      .match(e.request)
      .then((res) => {
        res ? resolve(res) : falloUnaVez();
      })
      .catch(falloUnaVez);
  });

  e.respondWith(respuesta);
});
