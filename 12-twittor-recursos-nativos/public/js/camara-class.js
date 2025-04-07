class Camara {
  constructor(videoNode) {
    this.videoNode = videoNode;
  }

  encender() {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 300, height: 300 },
        audio: false,
      })
      .then((stream) => {
        this.videoNode.srcObject = stream;
        this.stream = stream;
        // this.videoNode.play();
      });
  }

  apagar() {
    this.videoNode.pause();

    if (this.stream) {
      this.stream.getTracks()[0].stop();
    }
  }

  tomarFoto() {
    return new Promise((resolve, reject) => {
      // Crear un elemento canvas para renderizar la foto
      let canvas = document.createElement("canvas");

      // Colocar las dimensiones igual al elemento del video
      canvas.setAttribute("width", 300);
      canvas.setAttribute("height", 300);

      // Obtener el contexto de la imagen
      let ctx = canvas.getContext("2d");

      // Dibujar la imagen dentro del canvas
      ctx.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height);
      this.foto = canvas.toDataURL();

      // Limpieza
      canvas = null;
      context = null;

      return this.foto;
    });
  }
}
