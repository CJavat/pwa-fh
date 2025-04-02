// Ciclo de vida del SW

self.addEventListener("install", (event) => {
  // Descargar assets
  // Crear caché
  console.log("SW: Instalando SW");

  // self.skipWaiting();

  const instalacion = new Promise((res, rej) => {
    setTimeout(() => {
      console.log("SW: Instalaciones terminadas");
      self.skipWaiting();
      res();
    }, 1);
  });

  event.waitUntil(instalacion);
});

// Cuando el SW toma el control de la app
self.addEventListener("activate", (event) => {
  // Borrar caché viejo.
  console.log("SW: Activo y listo para controlar la app");
});

// Fetch: Manejo de peticiones HTTP
self.addEventListener("fetch", (event) => {
  // Aplicar estrategias del caché
  // console.log("SW", event.request.url);
  // if (event.request.url.includes("https://reqres.in")) {
  //   const resp = new Response(`{ ok: false,  messaje: 'jajaja' }`);
  //   event.respondWith(resp);
  // }
});

// SYNC: Recuperamos la conexión a internet.
// self.addEventListener("sync", (event) => {
//   console.log("¡Tenemos la conexión!");
//   console.log(event);
//   console.log(event.tag);
// });

// Push: Manejar las push notifications.
self.addEventListener("push", (event) => {
  console.log("Notificación Recibida");
});
