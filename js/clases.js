class Cliente {
    constructor(nombreUsuario, clave, nombrePerro, tamanioPerro, contratacion) {
        this.nombreUsuario = nombreUsuario;
        this.clave = clave;
        this.nombrePerro = nombrePerro;
        this.tamanioPerro = tamanioPerro;
        this.contratacion = contratacion;
    }
}

class Paseador {
    constructor(id, nombre, nombreUsuario, clave, cuposMaximos, contrataciones) {
        this.id = id;
        this.nombre = nombre;
        this.nombreUsuario = nombreUsuario;
        this.clave = clave;
        this.cuposMaximos = cuposMaximos;
        this.contrataciones = contrataciones;
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