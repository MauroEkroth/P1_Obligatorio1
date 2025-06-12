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
    constructor(id, cliente, paseador) {
        this.id = id;
        this.estado = "Pendiente";
        this.cliente = cliente;
        this.paseador = paseador;
    }
}