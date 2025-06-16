class Sistema {
    constructor() {
        //Clientes
        this.clientes = [
            new Cliente("Pablo Ramirez", "Qwer1234@!", "Max", "Mediano"),
            new Cliente("Miriam Ramirez", "Qwer1234@!", "Luna", "Chico"),
            new Cliente("Daniel Gutierrez", "Qwer1234@!", "Rocky", "Grande"),
            new Cliente("Maria Sanchez", "Qwer1234@!", "Canela", "Mediano"),
            new Cliente("Celia Fernandez", "Qwer1234@!", "Toby", "Chico"),
            new Cliente("Oscar Castillo", "Qwer1234@!", "Nala", "Grande"),
            new Cliente("Joaquin Duran", "Qwer1234@!", "Thor", "Grande"),
            new Cliente("Ana Castro", "Qwer1234@!", "Pelusa", "Chico"),
            new Cliente("Verónica Rojas", "Qwer1234@!", "Simba", "Mediano"),
            new Cliente("Juan Fuentes", "Qwer1234@!", "Bella", "Chico"),
            new Cliente("Enrique Reyes", "Qwer1234@!", "Bruno", "Grande"),
            new Cliente("Yolanda Perez", "Qwer1234@!", "Kira", "Mediano"),
            new Cliente("Sofía Gil", "Qwer1234@!", "Zeus", "Grande"),
            new Cliente("Ramon Flores", "Qwer1234@!", "Lola", "Chico"),
            new Cliente("Margarita Castillo", "Qwer1234@!", "Coco", "Mediano"),
            new Cliente("Irene Rubio", "Qwer1234@!", "Sasha", "Chico"),
            new Cliente("Domingo Garcia", "Qwer1234@!", "Duke", "Grande"),
            new Cliente("Manuela Leon", "Qwer1234@!", "Maya", "Mediano"),
            new Cliente("Manuel Leon", "Qwer1234@!", "Rex", "Grande"),
            new Cliente("Pablo Torres", "Qwer1234@!", "Andrew", "Chico")
        ];

        //Paseadores
        this.paseadores = [
            new Paseador(1, "Luis Herrera", "luis.herrera", "Qwer1234@!", 47),
            new Paseador(2, "Carla Morales", "carla.morales", "Qwer1234@!", 38),
            new Paseador(3, "Andrés Vargas", "andres.vargas", "Qwer1234@!", 44),
            new Paseador(4, "Patricia Ruiz", "patricia.ruiz", "Qwer1234@!", 31),
            new Paseador(5, "Fernando Soto", "fernando.soto", "Qwer1234@!", 50),
            new Paseador(6, "Gabriela Medina", "gabriela.medina", "Qwer1234@!", 29),
            new Paseador(7, "Iván Delgado", "ivan.delgado", "Qwer1234@!", 36),
            new Paseador(8, "Lucía Navarro", "lucia.navarro", "Qwer1234@!", 3),
            new Paseador(9, "Raúl Peña", "raul.pena", "Qwer1234@!", 3),
            new Paseador(10, "Elena Cabrera", "elena.cabrera", "Qwer1234@!", 1)
        ];

        //Contrataciones
        this.contrataciones = [
            new Contratacion(1, "Pablo Ramirez", 1),
            new Contratacion(2, "Miriam Ramirez", 2),
            new Contratacion(3, "Daniel Gutierrez", 3),
            new Contratacion(4, "Maria Sanchez", 4),
            new Contratacion(5, "Celia Fernandez", 5),
            new Contratacion(6, "Oscar Castillo", 6),
            new Contratacion(7, "Joaquin Duran", 7),
            new Contratacion(8, "Ana Castro", 8),
            new Contratacion(9, "Verónica Rojas", 9),
            new Contratacion(10, "Juan Fuentes", 10)
        ];
    }

    obtenerElementoPorPropiedad(lista, propiedad, valor) {
        let elementoEncontrado = null;
        if (lista.length === 0) return elementoEncontrado;

        for (let i = 0; i < lista.length; i++) {
            const elemento = lista[i];
            if (elemento[propiedad] === valor) {
                elementoEncontrado = elemento;
                break;
            }
        }

        return elementoEncontrado;
    }

    eliminarElementoPorPropiedad(lista, propiedad, valor) {
        let elementoEliminado = false;
        if (lista.length === 0) return elementoEliminado;

        for (let i = 0; i < lista.length; i++) {
            const elemento = lista[i];
            if (elemento[propiedad] === valor) {
                lista.splice(i, 1);
                elementoEliminado = true;
                break;
            }
        }

        return elementoEliminado;
    }

    validarCamposVaciosRegistro(nombreUsuario, clave, nombrePerro, tamanioPerro) {
        let campoValidos = false;
        if (nombreUsuario !== "" && clave !== "" && nombrePerro !== "" && tamanioPerro !== -1) campoValidos = true;
        return campoValidos;
    }

    validarFormatoClave(clave) {
        let valido = false;
        let contieneMayuscula = false;
        let contieneMinuscula = false;
        let contieneNumero = false;

        for (let i = 0; i < clave.length; i++) {
            const codigoCaracter = clave.charCodeAt(i);
            if ((codigoCaracter > 64 && codigoCaracter < 91) || codigoCaracter === 165) contieneMayuscula = true;
            else if ((codigoCaracter > 96 && codigoCaracter < 123) || codigoCaracter === 164) contieneMinuscula = true;
            else if (codigoCaracter > 47 && codigoCaracter < 58) contieneNumero = true;
        }

        if (clave.length >= 5 && contieneMayuscula && contieneMinuscula && contieneNumero) valido = true;
        return valido;
    }
}