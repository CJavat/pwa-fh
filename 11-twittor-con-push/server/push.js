const fs = require("fs");

const vapid = require("./vapid.json");
const webpush = require("web-push");
const urlSafeBase64 = require("urlsafe-base64");

let suscripciones = require("./subs-db.json");

webpush.setVapidDetails(
  "mailto:cdpm98@hotmail.com",
  vapid.publicKey,
  vapid.privateKey
);

module.exports.getKey = () => {
  return urlSafeBase64.decode(vapid.publicKey);
};

module.exports.addSubscription = (suscripcion) => {
  suscripciones.push(suscripcion);

  fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(suscripciones));

  console.log(suscripciones);
};

module.exports.sendPush = (post) => {
  let notificacionesEnviadas = [];

  suscripciones.forEach((suscripcion, index) => {
    const pushProm = webpush
      .sendNotification(suscripcion, JSON.stringify(post))
      .then(console.log("Notificación enviada"))
      .catch((err) => {
        console.error("Error al enviar notificación:", err);

        if (err.statusCode === 410) {
          //! 410 - GONE borrar las suscripciones fallidas

          suscripciones[index].borrar = true;
        }
      });

    notificacionesEnviadas.push(pushProm);
  });

  Promise.all(notificacionesEnviadas).then(() => {
    suscripciones = suscripciones.filter((subs) => !subs.borrar);

    fs.writeFileSync(
      `${__dirname}/subs-db.json`,
      JSON.stringify(suscripciones)
    );
  });
};
