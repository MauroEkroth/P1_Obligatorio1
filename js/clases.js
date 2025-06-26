class Cliente {
  constructor(nombreUsuario, clave, nombrePerro, tamanioPerro) {
    this.nombreUsuario = nombreUsuario;
    this.clave = clave;
    this.nombrePerro = nombrePerro;
    this.tamanioPerro = tamanioPerro;
  }
}

class Paseador {
  constructor(id, nombre, nombreUsuario, clave, cuposMaximos) {
    this.id = id;
    this.nombre = nombre;
    this.nombreUsuario = nombreUsuario;
    this.clave = clave;
    this.cuposMaximos = cuposMaximos;
  }
}

class Contratacion {
  constructor(id, estado, cliente, paseador) {
    this.id = id;
    this.estado = estado;
    this.cliente = cliente;
    this.paseador = paseador;
  }
}

class TamanioPerros {
  constructor(id, tamanio, cuposOcupados) {
    this.id = id;
    this.tamanio = tamanio;
    this.cuposOcupados = cuposOcupados;
  }
}