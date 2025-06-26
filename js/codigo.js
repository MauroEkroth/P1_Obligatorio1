window.addEventListener("load", inicio);
let sistema = new Sistema();

function inicio() {
  //carga inicial de valores
  cargarTamanioPerros();
  cargarPaseadores();
  mostrarBotones("invitado");

  //eventos de botones
  document.querySelector("#btnRegistro").addEventListener("click", registroUsuario);
  document.querySelector("#btnLogin").addEventListener("click", hacerLogin);
  document.querySelector("#btnSeccionSalir").addEventListener("click", salir);
  document.querySelector("#btnContratar").addEventListener("click", contratarPaseador);
  document.querySelector("#btnCancelarContratacion").addEventListener("click", cancelarContratacion);
  document
    .querySelector("#btnSeccionListadoContrataciones")
    .addEventListener("click", mostrarContratacionesPendientes);
  document
    .querySelector("#btnSeccionListadoPerrosAsignados")
    .addEventListener("click", consultaPerrosAsignados);

  //eventos de navegacion
  let botones = document.querySelectorAll(".btnSeccion");
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", mostrarSeccion);
  }
  //pantalla inicial del sitio es login
  document.querySelector("#seccionLogin").style.display = "block";

}

//  ----------------- Navegacion -----------------

function mostrarSeccion() {
  let idBtn = this.getAttribute("id");
  let idSeccion = idBtn.charAt(3).toLowerCase() + idBtn.substring(4);
  if (idSeccion === "seccionSalir") idSeccion = "seccionLogin";
  mostrarSeccionPorId(idSeccion);
}

function mostrarSeccionPorId(idSeccion) {
  ocultarSecciones();
  document.querySelector("#" + idSeccion).style.display = "block";
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
      // cargar y mostrar informacion relevante al cliente
      mostrarBotones("cliente");
      cargarContratacionActual();
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
  // cargar y mostrar informacion relevante al cliente
  mostrarBotones("cliente");
  cargarContratacionActual();
  mostrarPaseadoresDisponibles();
  mostrarMenuOcultandoLoginYRegistro();
}

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

//  ----------------- Funciones de la Pantalla Inicial para Clientes -----------------
let contratacionActiva;
function mostrarPaseadoresDisponibles() {
  if (!usuarioLogeado) return;
  contratacionActiva = sistema.obtenerElementoPorPropiedad(sistema.contrataciones, "cliente", usuarioLogeado.nombreUsuario);
  if (contratacionActiva !== null) habilitarContratarPaseador(false);
  let paseadoresDisponibles = sistema.listarPaseadoresDisponibles(usuarioLogeado);

  //por defecto se muestra un mensaje informando al usuario que no hay paseadores disponibles
  //si no hay paseadores se retorna y el usuario ve el mensaje por defecto
  if (paseadoresDisponibles.length === 0) return;

  let tablaPaseadoresDisponibles =
    `<thead>
    <th>Nombre</th>
    <th>Cupos Disponibles</th>
    <th>Perros Asignados</th>
    </thead>
    <tbody>`;
  let selectorPaseadores = "";
  for (let i = 0; i < paseadoresDisponibles.length; i++) {
    const paseador = paseadoresDisponibles[i];
    let cuposDisponibles = sistema.calcularCuposDisponibles(paseador);
    let perrosAsignados = sistema.calcularPerrosAsignados(paseador);
    tablaPaseadoresDisponibles +=
      `<tr>
      <td>${paseador.nombre}</td>
      <td>${cuposDisponibles}</td>
      <td>${perrosAsignados}</td>
      </tr>`
    selectorPaseadores += `<option value="${paseador.id}">${paseador.nombre}</option>`;
  }
  tablaPaseadoresDisponibles += "</tbody>";

  //cargar table y select con los datos
  document.querySelector("#paseadoresDisponibles").innerHTML = tablaPaseadoresDisponibles;
  document.querySelector("#slcPaseadorSeleccionado").innerHTML = selectorPaseadores;
  if (contratacionActiva === null) habilitarContratarPaseador(true);
  mostrarSeccionPorId("seccionPaseadoresDisponibles");
}

function contratarPaseador() {
  let paseadorSeleccionado = Number(document.querySelector("#slcPaseadorSeleccionado").value);
  sistema.agregarContratacion(usuarioLogeado.nombreUsuario, paseadorSeleccionado);
  mostrarPaseadoresDisponibles();
  cargarContratacionActual();
}

function habilitarContratarPaseador(habilitar) {
  let pMensaje = document.querySelector("#pMensajeContratarPaseador");
  let slcPaseadores = document.querySelector("#slcPaseadorSeleccionado");
  let btnContratar = document.querySelector("#btnContratar");
  if (habilitar) {
    pMensaje.innerHTML = "";
    slcPaseadores.disabled = false;
    btnContratar.disabled = false;
  } else {
    pMensaje.innerHTML = "Se realizo una contratacion";
    slcPaseadores.disabled = true;
    btnContratar.disabled = true;
  }
}

function cargarPaseadores() {
  if (sistema.paseadores.length === 0) return;

  let tablaPaseadores =
    `<thead>
    <th>Nombre</th>
    <th>Perros Asignados</th>
    </thead>
    <tbody>`;
  for (let i = 0; i < sistema.paseadores.length; i++) {
    const paseador = sistema.paseadores[i];
    let perrosAsignados = sistema.calcularPerrosAsignados(paseador);
    tablaPaseadores +=
      `<tr>
      <td>${paseador.nombre}</td>
      <td>${perrosAsignados}</td>
      </tr>`
  }
  tablaPaseadores += "</tbody>";

  document.querySelector("#listaPaseadores").innerHTML = tablaPaseadores;
}

function cargarContratacionActual() {
  let elementoMensaje = document.querySelector("#pPaseadorSolicitado");
  let elementoBoton = document.querySelector("#btnCancelarContratacion");
  let contratacion = sistema.obtenerElementoPorPropiedad(sistema.contrataciones, "cliente", usuarioLogeado.nombreUsuario);

  if (contratacion === null || contratacion.estado !== "Pendiente") {
    elementoMensaje.innerHTML = "No hay una contratación pendiente en este momento";
    elementoBoton.style.display = "none";
    return;
  }
  let paseador = sistema.obtenerElementoPorPropiedad(sistema.paseadores, "id", contratacion.paseador);
  elementoMensaje.innerHTML = `Paseador solicitado: <strong>${paseador.nombre}</strong>`;
  elementoBoton.style.display = "block";
}

function cancelarContratacion() {
  let contratacion = sistema.obtenerElementoPorPropiedad(sistema.contrataciones, "cliente", usuarioLogeado.nombreUsuario);
  sistema.eliminarElementoPorPropiedad(sistema.contrataciones, "id", contratacion.id);
  mostrarPaseadoresDisponibles();
  mostrarSeccionPorId("seccionCancelarContratacion");
  cargarContratacionActual();
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
  }
}


//  ------------- Consulta de perros asignados a paseadores----------


function consultaPerrosAsignados() {
  let tabla = ''
  tabla = sistema.listarPerrosAsignados(usuarioLogeado)
  document.querySelector("#tablaPerrosAsignados").innerHTML = tabla
}