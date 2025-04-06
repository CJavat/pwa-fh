// Routes.js - Módulo de rutas
var express = require("express");
var router = express.Router();

const mensajes = [
  { _id: "XXX", user: "spiderman", mensaje: "Hola Mundo" },
  { _id: "XXX", user: "ironman", mensaje: "Hola Mundo" },
  { _id: "XXX", user: "hulk", mensaje: "Hola Mundo" },
  { _id: "XXX", user: "wolverine", mensaje: "Hola Mundo" },
];

// Get mensajes
router.get("/", function (req, res) {
  res.json(mensajes);
});

router.post("/", function (req, res) {
  const mensaje = {
    user: req.body.user,
    mensaje: req.body.mensaje,
  };

  mensajes.push(mensaje);
  console.log(mensajes);

  return res.json({ ok: true, mensaje });
});

module.exports = router;
