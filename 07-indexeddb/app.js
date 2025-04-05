// indexedDB: Reforzamiento

let request = window.indexedDB.open("mi-database", 1);

// Se actualiza cuando se crea o se sube de version de la DB.
request.onupgradeneeded = (event) => {
  let db = event.target.result;

  // Se crea una nueva versión de la base de datos.
  db.createObjectStore("heroes", { keyPath: "id" });
};

request.onerror = (event) => {
  console.log("Error al abrir la base de datos:", event.target.errorCode);
};

// Insertar datos.
request.onsuccess = (event) => {
  let db = event.target.result;

  let heroesData = [
    { id: "1111", nombre: "IronMan", mensaje: "Aquí en mi nuevo Mark 50" },
    { id: "2222", nombre: "Spiderman", mensaje: "Aquí su amigo Spider-Man" },
  ];

  let heroesTransaction = db.transaction("heroes", "readwrite");

  heroesTransaction.onerror = (event) => {
    console.log("Error guardando...", event.target.error);
  };

  // Informar sobre el éxito de la transacción
  heroesTransaction.oncomplete = (event) => {
    console.log("Transacción completada.", event);
  };

  let heroesStore = heroesTransaction.objectStore("heroes");

  for (const heroe of heroesData) {
    heroesStore.add(heroe);
  }

  heroesStore.onsuccess = (event) => {
    console.log("Nuevo item agregado a la base de datos");
  };
};
