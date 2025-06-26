window.addEventListener("load", inicio);

function inicio() {
  cargarTamanioPerros();
  document
    .querySelector("#btnRegistro")
    .addEventListener("click", registroUsuario);
  document.querySelector("#btnLogin").addEventListener("click", hacerLogin);
  ocultarSecciones();
  document
    .querySelector("#btnSeccionListadoContrataciones")
    .addEventListener("click", mostrarContratacionesPendientes);
  document
    .querySelector("#btnSeccionListadoPerrosAsignados")
    .addEventListener("click", consultaPerrosAsignados);
  document.querySelector("#btnSeccionSalir").addEventListener("click", salir);

  ocultarSecciones();
  let botones = document.querySelectorAll(".btnSeccion");
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", mostrarSeccion);
  }
  mostrarBotones("invitado");
  document.querySelector("#seccionLogin").style.display = "block";

}

//  ----------------- Navegacion -----------------

function mostrarSeccion() {
  ocultarSecciones();
  let idBtn = this.getAttribute("id");
  let idSeccion = idBtn.charAt(3).toLowerCase() + idBtn.substring(4);
  if (idSeccion !== "seccionSalir") {
    document.querySelector("#" + idSeccion).style.display = "block";
  } else {
    document.querySelector("#seccionLogin").style.display = "block";
  }
}

function mostrarSeccionPorId(idSeccion) {
  ocultarSecciones();
  document.querySelector("#" + idSeccion).style.display = "block";
}

function mostrarPaseadoresDisponibles() {
  if (!usuarioLogeado) return;
  let paseadoresDisponibles =
    sistema.listarPaseadoresDisponibles(usuarioLogeado);
  if (paseadoresDisponibles.length === 0) return;
  let tablaPaseadoresDisponibles = `<thead>
    <th>Nombre</th>
    <th>Cupos Disponibles</th>
    <th>Perros Asignados</th>
    </thead>
    <tbody>`;
  for (let i = 0; i < paseadoresDisponibles.length; i++) {
    const paseador = paseadoresDisponibles[i];
    let cuposDisponibles = sistema.calcularCuposDisponibles(paseador);
    let perrosAsignados = sistema.calcularPerrosAsignados(paseador);
    tablaPaseadoresDisponibles += `<tr>
      <td>${paseador.nombre}</td>
      <td>${cuposDisponibles}</td>
      <td>${perrosAsignados}</td>
      </tr>`;
  }
  tablaPaseadoresDisponibles += "</tbody>";
  document.querySelector("#paseadoresDisponibles").innerHTML =
    tablaPaseadoresDisponibles;
  mostrarSeccionPorId("seccionPaseadoresDisponibles");
}

function ocultarSecciones() {
  let seccion = document.querySelectorAll(".seccion");
  for (let i = 0; i < seccion.length; i++) {
    seccion[i].style.display = "none";
  }
}

function mostrarBotones(tipo) {
  ocultarBotones();
  let botonesMostrar = document.querySelectorAll("." + tipo);
  for (let i = 0; i < botonesMostrar.length; i++) {
    botonesMostrar[i].style.display = "block";
  }
}

function ocultarBotones() {
  let botonesOcultar = document.querySelectorAll(".btnSeccion");
  for (let i = 0; i < botonesOcultar.length; i++) {
    botonesOcultar[i].style.display = "none";
  }
}
//  ----------------- Funciones de Acceso -----------------
let usuarioLogeado = null;

function hacerLogin() {
  let nombre = document.querySelector("#txtUsuario").value;
  let clave = document.querySelector("#txtClave").value;
  let mensaje = "";

  let login = sistema.verificarLogin(nombre, clave);
  if (login === true) {
    document.querySelector("#txtUsuario").value = "";
    document.querySelector("#txtClave").value = "";
    document.querySelector("#resultado").value = "";
    usuarioLogeado = sistema.obtenerElementoPorPropiedad(
      sistema.clientes,
      "nombreUsuario",
      nombre
    );

    if (usuarioLogeado) {
      mostrarBotones("cliente");
      mostrarPaseadoresDisponibles();
    } else {
      usuarioLogeado = sistema.obtenerElementoPorPropiedad(
        sistema.paseadores,
        "nombreUsuario",
        nombre
      );
      mostrarBotones("paseador");
      mostrarSeccionPorId("seccionListadoContrataciones");
      mostrarContratacionesPendientes();
    }

    mostrarMenuOcultandoLoginYRegistro();
  } else {
    mensaje = login;
  }
  document.querySelector("#resultado").innerHTML = mensaje;
}

function mostrarMenuOcultandoLoginYRegistro() {
  document.querySelector("#seccionLogin").style.display = "none";
  document.querySelector("#seccionRegistro").style.display = "none";
  document.querySelector("#navPrincipal").style.display = "block";
  document.querySelector("#nombreUsuarioLogeado").style.display = "block";
  document.querySelector("#nombreUsuarioLogeado").innerHTML =
    "Bienvenido " + (usuarioLogeado.nombre || usuarioLogeado.nombreUsuario);
}

function salir() {
  ocultarSecciones();
  mostrarBotones("invitado");
  document.querySelector("#seccionLogin").style.display = "block";
  usuarioLogeado = null;
  document.querySelector("#nombreUsuarioLogeado").style.display = "none";
}

function registroUsuario() {
  let usuario = document.querySelector("#txtRegistroUsuario").value;
  let nombrePerro = document.querySelector("#txtRegistroNombrePerro").value;
  let tamanioPerro = Number(
    document.querySelector("#slcRegistroTamanoPerro").value
  );
  let password = document.querySelector("#txtRegistroClave").value;
  let rePassword = document.querySelector("#txtRegistroRepetirClave").value;

  const error = sistema.validarDatosRegistro(
    usuario,
    nombrePerro,
    tamanioPerro,
    password,
    rePassword
  );

  if (error) {
    document.querySelector("#pError").innerHTML = error;
    return;
  }
  if (tamanioPerro === 1) {
    tamanioPerro = "Chico";
  } else if (tamanioPerro === 2) {
    tamanioPerro = "Mediano";
  } else {
    tamanioPerro = "Grande";
  }

  sistema.agregarCliente(usuario, password, nombrePerro, tamanioPerro);
  document.querySelector("#txtRegistroUsuario").value = "";
  document.querySelector("#txtRegistroClave").value = "";
  document.querySelector("#txtRegistroRepetirClave").value = "";
  document.querySelector("#txtRegistroNombrePerro").value = "";
  document.querySelector("#slcRegistroTamanoPerro").value = "";
  document.querySelector("#pError").innerHTML = "Usuario creado existosamente";
  usuarioLogeado = sistema.obtenerElementoPorPropiedad(
    sistema.clientes,
    "nombreUsuario",
    usuario
  );
  mostrarBotones("cliente");
  mostrarPaseadoresDisponibles();

  mostrarMenuOcultandoLoginYRegistro();
}

let sistema = new Sistema();

function cargarTamanioPerros() {
  document.querySelector(
    "#slcRegistroTamanoPerro"
  ).innerHTML = `<option value="-1">Seleccione una opcion...</option>`;
  for (let i = 0; i < sistema.tamanioPerros.length; i++) {
    const unTamanioPerro = sistema.tamanioPerros[i];

    document.querySelector(
      "#slcRegistroTamanoPerro"
    ).innerHTML += `<option value="${unTamanioPerro.id}">${unTamanioPerro.tamanio}</option>`;
  }
}

//   ------------- Mostrar Contrataciones paseadores----------

function mostrarContratacionesPendientes() {
  if (!usuarioLogeado) return;

  ocultarSecciones();
  let estados = ["Pendiente", "Aprobada", "Rechazada"];
  let tabla = "";
  for (let i = 0; i < estados.length; i++) {
    tabla += sistema.listadarContrataciones(estados[i]);
  }

  let contenedor = document.querySelector("#tablaContratacionesPendientes");
  if (!tabla) {
    contenedor.innerHTML = "<p>No se encontraron solicitudes.</p>";
  } else {
    contenedor.innerHTML = tabla;
  }
  document.querySelector("#seccionListadoContrataciones").style.display =
    "block";


  let botonesAprobar = document.querySelectorAll(".btnAprobar");
  for (let i = 0; i < botonesAprobar.length; i++) {
    botonesAprobar[i].addEventListener("click", botonProcesar);
  }
}

function botonProcesar() {
  let idBoton = this.id;

  let contratacion = null;
  for (let j = 0; j < sistema.contrataciones.length; j++) {
    if (sistema.contrataciones[j].id == idBoton) {
      contratacion = sistema.contrataciones[j];
      break;
    }
  }

  if (contratacion) {
    let aprobado = sistema.procesarAprobacion(contratacion, usuarioLogeado);
    mostrarContratacionesPendientes();
    if (aprobado) {
      document.querySelector("#btnContenedor").innerHTML = "<p>Aprobado</p>";
    } else {
      document.querySelector("#btnContenedor").innerHTML = "<p> Rechazado </p>";
    }
  }
}


//  ------------- Consulta de perros asignados a paseadores----------


function consultaPerrosAsignados() {
  let tabla = ''
  tabla = sistema.listarPerrosAsignados(usuarioLogeado)
  document.querySelector("#tablaPerrosAsignados").innerHTML = tabla
}