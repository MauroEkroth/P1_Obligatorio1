window.addEventListener("load", inicio);

function inicio() {
  cargarTamanioPerros();
  document
    .querySelector("#btnRegistro")
    .addEventListener("click", registroUsuario);
  document.querySelector("#btnLogin").addEventListener("click", hacerLogin);
  ocultarSecciones();
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
    usuarioLogeado = sistema.obtenerUsuario(
      sistema.clientes,
      "nombreUsuario",
      nombre
    );

    if (usuarioLogeado) {
      mostrarBotones("cliente");
    } else {
      usuarioLogeado = sistema.obtenerUsuario(
        sistema.paseadores,
        "nombreUsuario",
        nombre
      );
      mostrarBotones("paseador");
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

  if (!usuario) {
    return sistema.mostrarError("Ingrese correctamente el usuario.");
  } else {
    //   Verificar si usuario ya existe
    let existeUsuario = sistema.obtenerUsuario(
      sistema.clientes,
      "nombreUsuario",
      usuario
    );
    if (existeUsuario) {
      return sistema.mostrarError("El nombre de usuario ya existe");
    }
  }

  if (sistema.validarFormatoClave(password) !== true) {
    console.log(sistema.validarFormatoClave(password));
    document.querySelector("#pError").innerHTML =
      sistema.validarFormatoClave(password);
    return;
  }

  if (password !== rePassword) {
    return sistema.mostrarError("Las contraseñas deben coincidir.");
  }

  if (!nombrePerro) {
    return sistema.mostrarError("Ingrese correctamente el nombre del perro.");
  }

  if (tamanioPerro === -1) {
    return sistema.mostrarError("Ingrese correctamente el tamaño del perro.");
  }

  sistema.agregarCliente(usuario, password, nombrePerro, tamanioPerro);
  document.querySelector("#txtRegistroUsuario").value = "";
  document.querySelector("#txtRegistroClave").value = "";
  document.querySelector("#txtRegistroRepetirClave").value = "";
  document.querySelector("#txtRegistroNombrePerro").value = "";
  document.querySelector("#slcRegistroTamanoPerro").value = "";
  document.querySelector("#pError").innerHTML = "Usuario creado existosamente";
  usuarioLogeado = sistema.obtenerUsuario(
    sistema.clientes,
    "nombreUsuario",
    usuario
  );
  mostrarBotones("cliente");

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
