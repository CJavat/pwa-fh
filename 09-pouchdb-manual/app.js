// Entrenamiento PouchDB

// 1- Crear la base de datos
// Nombre:  mensajes
const db = new PouchDB("mensajes");
const remoteCouch = false;

// Objeto a grabar en base de datos
let mensaje = {
  _id: new Date().toISOString(),
  user: "spiderman",
  mensaje: "Mi tía hizo unos panqueques muy buenos",
  sincronizado: false,
};

// 2- Insertar en la base de datos
db.put(mensaje, function callback(err, result) {
  if (!err) {
    console.log("Successfully posted a todo!");
  }
});

// 3- Leer todos los mensajes offline
// Que aparezcan en la consola
db.allDocs({ include_docs: true, descending: false }, function (err, doc) {
  console.log(doc.rows);
});

// 4- Cambiar el valor 'sincronizado' de todos los objetos
//  en la BD a TRUE
// db.allDocs({ include_docs: true, descending: false }, function (err, doc) {
//   doc.rows.forEach((row) => {
//     let doc = row.doc;
//     doc.sincronizado = true;
//     db.put(doc);
//   });

//   console.log(doc.rows);
// });

// 5- Borrar todos los registros, uno por uno, evaluando
// cuales estan sincronizados
// deberá de comentar todo el código que actualiza
// el campo de la sincronización
db.allDocs({ include_docs: true, descending: false }, function (err, doc) {
  console.log(doc.rows);
  doc.rows.forEach((row) => {
    let doc = row.doc;
    if (doc.sincronizado === true) {
      db.remove(doc);
    }
  });
});
