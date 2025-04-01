self.addEventListener("fetch", (event) => {
  // if (event.request.url.includes("style.css")) {
  //   let respuesta = new Response(
  //     `
  //     body {
  //       background-color: blue !important;
  //       color: pink;
  //     }
  //   `,
  //     {
  //       headers: {
  //         "Content-Type": "text/css",
  //       },
  //     }
  //   );
  //   event.respondWith(respuesta);
  // }
  //
  // if (event.request.url.includes("main.jpg")) {
  //   event.respondWith(fetch("/img/main-patas-arriba.jpg"));
  // }

  event.respondWith(
    fetch(event.request).then((resp) => {
      if (resp.ok) {
        return resp;
      } else {
        return fetch("img/main.jpg");
      }
    })
  );
});
