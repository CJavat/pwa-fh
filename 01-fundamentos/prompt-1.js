function sumarUno(numero, callback) {
  if (numero >= 7) {
    callback("Número muy alto");
    return;
  }

  setTimeout(() => {
    // return numero + 1;
    callback(null, numero + 1);
  }, 800);
}

sumarUno(5, function (error, nuevoValor) {
  if (error) {
    console.log(error);
  }
  sumarUno(nuevoValor, function (error, nuevoValor2) {
    if (error) {
      console.log(error);
    }
    sumarUno(nuevoValor2, function (error, nuevoValor3) {
      if (error) {
        console.log(error);
      }
      console.log(nuevoValor3);
    });
  });
});

console.log();
