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
      new Cliente("Pablo Torres", "Qwer1234@!", "Andrew", "Chico"),
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

    this.tamanioPerros = [
      new TamanioPerros(1, "Chico", 1),
      new TamanioPerros(2, "Mediano", 2),
      new TamanioPerros(3, "Grande", 4)
    ];
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

  listarPaseadoresDisponibles(cliente) {
    let paseadoresDisponibles = [];
    let tamanio = this.obtenerElementoPorPropiedad(
      this.tamanioPerros,
      "tamanio",
      cliente.tamanioPerro
    );
    for (let i = 0; i < this.paseadores.length; i++) {
      const paseador = this.paseadores[i];
      let cuposDisponibles = this.calcularCuposDisponibles(paseador);
      if (cuposDisponibles < tamanio.cuposOcupados) continue;
      let tamanioNoCompatible = this.verificarCompatibilidadTamanios(
        paseador,
        cliente
      );
      if (tamanioNoCompatible !== cliente.tamanioPerro)
        paseadoresDisponibles.push(paseador);
    }
    return paseadoresDisponibles;
  }

  calcularCuposDisponibles(paseador) {
    let cuposDisponibles = paseador.cuposMaximos;
    for (let i = 0; i < this.contrataciones.length; i++) {
      const contratacion = this.contrataciones[i];
      if (contratacion.paseador === paseador.id) {
        let cliente = this.obtenerElementoPorPropiedad(
          this.clientes,
          "nombreUsuario",
          contratacion.cliente
        );
        let tamanio = this.obtenerElementoPorPropiedad(
          this.tamanioPerros,
          "tamanio",
          cliente.tamanioPerro
        );
        cuposDisponibles -= tamanio.cuposOcupados;
      }
    }
    return cuposDisponibles;
  }

  calcularPerrosAsignados(paseador) {
    let perrosAsignados = 0;
    for (let i = 0; i < this.contrataciones.length; i++) {
      const contratacion = this.contrataciones[i];
      if (contratacion.paseador === paseador.id) perrosAsignados++;
    }
    return perrosAsignados;
  }

  verificarCompatibilidadTamanios(paseador, cliente) {
    let tamanioNoValido = "";
    for (let i = 0; i < this.contrataciones.length; i++) {
      const contratacion = this.contrataciones[i];
      if (contratacion.paseador === paseador.id) {
        let clienteContratacion = this.obtenerElementoPorPropiedad(
          this.clientes,
          "nombreUsuario",
          contratacion.cliente
        );
        if (
          clienteContratacion.tamanioPerro === "Chico" &&
          cliente.tamanioPerro === "Grande"
        ) {
          tamanioNoValido = "Grande";
          break;
        } else if (
          clienteContratacion.tamanioPerro === "Grande" &&
          cliente.tamanioPerro === "Chico"
        ) {
          tamanioNoValido = "Chico";
          break;
        }
      }
    }
    return tamanioNoValido;
  }

  validarFormatoClave(clave) {
    let valido = false;
    let contieneMayuscula = false;
    let contieneMinuscula = false;
    let contieneNumero = false;

    for (let i = 0; i < clave.length; i++) {
      const codigoCaracter = clave.charCodeAt(i);
      if (
        (codigoCaracter > 64 && codigoCaracter < 91) ||
        codigoCaracter === 165
      )
        contieneMayuscula = true;
      else if (
        (codigoCaracter > 96 && codigoCaracter < 123) ||
        codigoCaracter === 164
      )
        contieneMinuscula = true;
      else if (codigoCaracter > 47 && codigoCaracter < 58)
        contieneNumero = true;
    }

    if (
      clave.length >= 5 &&
      contieneMayuscula &&
      contieneMinuscula &&
      contieneNumero
    ) {
      valido = true;
    } else {
      let resultado = "";
      if (clave.length >= 5) {
        resultado += "✅ Mínimo 5 caracteres <br>";
      } else {
        resultado += "❌ Mínimo 5 caracteres <br>";
      }

      if (contieneMayuscula) {
        resultado += "✅ Contiene al menos una letra mayúscula <br>";
      } else {
        resultado += "❌ Contiene al menos una letra mayúscula <br>";
      }

      if (contieneMinuscula) {
        resultado += "✅ Contiene al menos una letra minúscula <br>";
      } else {
        resultado += "❌ Contiene al menos una letra minúscula <br>";
      }

      if (contieneNumero) {
        resultado += "✅ Contiene al menos un número <br>";
      } else {
        resultado += "❌ Contiene al menos un número <br>";
      }
      return resultado;
    }
    return valido;
  }

  validarDatosRegistro(
    usuario,
    nombrePerro,
    tamanioPerro,
    password,
    rePassword
  ) {
    if (!usuario) {
      return "Ingrese correctamente el usuario.";
    } else {
      //   Verificar si usuario ya existe
      let existeUsuario = this.obtenerElementoPorPropiedad(
        this.clientes,
        "nombreUsuario",
        usuario
      );
      if (!existeUsuario) {
        existeUsuario = this.obtenerElementoPorPropiedad(
          this.paseadores,
          "nombreUsuario",
          usuario
        );
      }
      if (existeUsuario) return "El nombre de usuario ya existe";
    }

    if (this.validarFormatoClave(password) !== true) {
      return this.validarFormatoClave(password);
    }

    if (password !== rePassword) return "Las contraseñas deben coincidir.";

    if (!nombrePerro) return "Ingrese correctamente el nombre del perro.";

    if (tamanioPerro === -1)
      return "Ingrese correctamente el tamaño del perro.";

    return;
  }

  agregarCliente(unUsuario, unClave, unNombrePerro, unTamanioPerro) {
    this.clientes.push(
      new Cliente(unUsuario, unClave, unNombrePerro, unTamanioPerro)
    );
  }

  verificarLogin(nomUsuario, clave) {
    let resultado = false;
    // buscar usuario cliente
    let unUsuario = this.obtenerElementoPorPropiedad(
      this.clientes,
      "nombreUsuario",
      nomUsuario
    );
    if (unUsuario === null) {
      // buscar si existe usuario paseador
      unUsuario = this.obtenerElementoPorPropiedad(
        this.paseadores,
        "nombreUsuario",
        nomUsuario
      );
    }

    if (unUsuario !== null) {
      if (unUsuario.clave === clave) {
        resultado = true;
      } else {
        resultado = "Contraseña incorrecta";
      }
    } else {
      resultado = "Nombre de usuario incorrecto";
    }
    return resultado;
  }

  obtenerElementoPorPropiedad(arrElementos, propiedad, busqueda) {
    let objeto = null;
    for (let i = 0; i < arrElementos.length; i++) {
      const unElemento = arrElementos[i];
      if (unElemento[propiedad] === busqueda) {
        objeto = unElemento;
        break;
      }
    }
    return objeto;
  }

  //

  listadarContrataciones(estadoContratacion) {
    let pendientes = [];
    for (let i = 0; i < this.contrataciones.length; i++) {
      const unaContratacion = this.contrataciones[i];

      if (
        unaContratacion.estado === estadoContratacion &&
        unaContratacion.paseador === usuarioLogeado.id
      ) {
        pendientes.push(unaContratacion);
      }
    }
    let tabla = `
      <h2>Contrataciones ${estadoContratacion}</h2>
      <table>
      <thead>
      <th>Solicitante</th>
      <th>Perro</th>
      <th>Tamano</th>
      <th>Estado</th>
    </thead>
    <tbody>`;

    for (let i = 0; i < pendientes.length; i++) {
      const unaContratacion = pendientes[i];
      const cliente = this.obtenerElementoPorPropiedad(
        this.clientes,
        "nombreUsuario",
        unaContratacion.cliente
      );

      tabla += `<tr>
      <td>${cliente.nombreUsuario}</td>
      <td>${cliente.nombrePerro} </td>
      <td>${cliente.tamanioPerro}</td>`

      if (unaContratacion.estado === "Pendiente") {
          tabla += `<td id="btnContenedor"><button class="btnAprobar" id="${unaContratacion.id}">Procesar</button></td>`;
        } else {
          tabla += `<td>${unaContratacion.estado}</td>`;
        }
  
    }

    tabla += "</tbody></table>";

    return tabla;
  }

  procesarAprobacion(contratacion, paseador) {
    if (contratacion.id !== paseador.id) {
      contratacion.estado = "Rechazada";
      return false;
    }

    // Validación de cupos disponibles
    let cuposDisponibles = this.calcularCuposDisponibles(paseador);
    let cliente = this.obtenerElementoPorPropiedad(
      this.clientes,
      "nombreUsuario",
      contratacion.cliente
    );
    let tamanio = this.obtenerElementoPorPropiedad(
      this.tamanioPerros,
      "tamanio",
      cliente.tamanioPerro
    );

    if (cuposDisponibles < tamanio.cuposOcupados) {
      contratacion.estado = "Rechazada | no hay cupos disponibles";
      return false;
    }

    // Validar compatibilidad de tamaño
    let incompatibilidad = this.verificarCompatibilidadTamanios(
      paseador,
      cliente
    );
    if (incompatibilidad === cliente.tamanioPerro) {
      contratacion.estado =
        "Rechazada | no puede ir un perro grande con uno chico";
      return false;
    }

    // Si pasa todas las validaciones, se aprueba
    contratacion.estado = "Aprobada";
    return true;
  }



  
  listarPerrosAsignados(paseador) {
    let tabla = `
    <h2>Perros Asignados</h2>
    <table>
    <thead>
    <th>Nombre</th>
    <th>Tamano</th>
    </thead>
    <tbody>`;

    let cuposOcupados= 0
    for (let i = 0; i < this.contrataciones.length; i++) {
      let contratacion = this.contrataciones[i];
      if (contratacion.paseador === paseador.id && contratacion.estado === 'Aprobada') {
        let cliente = this.obtenerElementoPorPropiedad(
          this.clientes,
          "nombreUsuario",
          contratacion.cliente
        );
        
        let tamanioPerro = cliente.tamanioPerro
          if (tamanioPerro === "Chico") {
          tamanioPerro = 1;
        } else if (tamanioPerro === "Mediano") {
          tamanioPerro = 2;
        } else {
          tamanioPerro = 4;
        }
        
        cuposOcupados += tamanioPerro

          tabla += `<tr>
            <td>${cliente.nombrePerro}</td>
            <td>${cliente.tamanioPerro}</td>
          </tr>`;
      }
    }
     if (cuposOcupados === 0) {
    tabla += `<p>No hay perros asignados actualmente.</p>`;
     }

        tabla += "</tbody></table>";
        tabla += `<div>
        <p>Cupos Ocupados: ${paseador.cuposMaximos -
          cuposOcupados
          }</p>
          <p>Cupos Maximos: ${paseador.cuposMaximos} </p>
          <p>Porcentaje de ocupacion: ${parseInt((cuposOcupados /
            paseador.cuposMaximos) *
          100)
          }%</p>
              </div>`;
    return tabla;
  }
}
