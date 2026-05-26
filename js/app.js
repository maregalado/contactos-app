// ============================================
// app.js — Lógica principal de la aplicación
// ============================================
// Este archivo gestiona:
//   1. Mostrar la lista de contactos
//   2. Añadir nuevos contactos
//   3. Eliminar contactos
//   4. Buscar contactos por nombre
// ============================================

// ---- VARIABLES GLOBALES ----
var contactos = cargarContactos(); // viene de datos.js

// ---- REFERENCIAS AL HTML ----
var formulario      = document.getElementById('form-contacto');
var inputNombre     = document.getElementById('nombre');
var inputTelefono   = document.getElementById('telefono');
var inputEmail      = document.getElementById('email');
var selectCategoria = document.getElementById('categoria');
var mensajeError    = document.getElementById('error-msg');
var buscador        = document.getElementById('buscador');
var listaContactos  = document.getElementById('lista-contactos');
var contador        = document.getElementById('contador');

// ---- FUNCIÓN: ORDENAR CONTACTOS ----
// Devuelve una copia de la lista ordenada alfabéticamente por nombre.
// Usa localeCompare con locale español para que ñ, á, é, etc. se ordenen bien.
function ordenarContactos(lista) {
  return lista.slice().sort(function(a, b) {
    return a.nombre.localeCompare(b.nombre, 'es');
  });
}

// ---- FUNCIÓN: RENDERIZAR LISTA ----
// Dibuja los contactos en pantalla
// Acepta un array de contactos (para poder filtrar)
function renderizarContactos(lista) {
  var listaOrdenada = ordenarContactos(lista);
  contador.textContent = listaOrdenada.length;

  if (listaOrdenada.length === 0) {
    listaContactos.innerHTML = '<p class="empty-state">No se encontraron contactos.</p>';
    return;
  }

  var html = '';
  for (var i = 0; i < listaOrdenada.length; i++) {
    var c = listaOrdenada[i];
    var iniciales = obtenerIniciales(c.nombre);
    var colorAvatar = obtenerColorCategoria(c.categoria);
    var detalles = c.email ? c.telefono + ' · ' + c.email : c.telefono;

    html += '<div class="contact-card">';
    html +=   '<div class="contact-avatar" style="background:' + colorAvatar + '">' + iniciales + '</div>';
    html +=   '<div class="contact-info">';
    html +=     '<div class="contact-nombre">' + c.nombre + '</div>';
    html +=     '<div class="contact-detalle">' + detalles + '</div>';
    html +=   '</div>';
    html +=   '<span class="contact-badge badge-' + c.categoria + '">' + c.categoria + '</span>';
    html +=   '<button class="btn btn--eliminar" onclick="eliminarContacto(' + c.id + ')">Eliminar</button>';
    html += '</div>';
  }

  listaContactos.innerHTML = html;
}

// ---- FUNCIÓN: OBTENER INICIALES ----
// Extrae las iniciales del nombre para el avatar
// Ejemplo: "Ana García" → "AG"
function obtenerIniciales(nombre) {
  var palabras = nombre.trim().split(' ');
  if (palabras.length >= 2) {
    return palabras[0][0].toUpperCase() + palabras[1][0].toUpperCase();
  }
  return palabras[0][0].toUpperCase();
}

// ---- FUNCIÓN: COLOR POR CATEGORÍA ----
function obtenerColorCategoria(categoria) {
  var colores = {
    personal: '#7c3aed',
    trabajo:  '#0891b2',
    familia:  '#16a34a'
  };
  return colores[categoria] || '#6b7280';
}

// ---- FUNCIÓN: VALIDAR FORMULARIO ----
// Devuelve un mensaje de error o cadena vacía si todo está bien
function validarFormulario(nombre, telefono) {
  if (nombre.length === 0) {
    return 'El nombre es obligatorio.';
  }
  // Valida teléfono español: exactamente 9 dígitos, empieza por 6, 7, 8 o 9
  var formatoTelefono = /^[6789]\d{8}$/;
  if (!formatoTelefono.test(telefono)) {
    return 'El teléfono debe tener 9 dígitos y empezar por 6, 7, 8 o 9.';
  }
  return '';
}

// ---- FUNCIÓN: AÑADIR CONTACTO ----
function anadirContacto(evento) {
  evento.preventDefault();

  var nombre    = inputNombre.value.trim();
  var telefono  = inputTelefono.value.trim();
  var email     = inputEmail.value.trim();
  var categoria = selectCategoria.value;

  // Validar
  var error = validarFormulario(nombre, telefono);
  if (error) {
    mensajeError.textContent = error;
    mensajeError.style.display = 'block';
    return;
  }

  mensajeError.style.display = 'none';

  // Crear el nuevo contacto
  var nuevoContacto = {
    id:        generarId(contactos), // viene de datos.js
    nombre:    nombre,
    telefono:  telefono,
    email:     email,
    categoria: categoria
  };

  contactos.push(nuevoContacto);
  guardarContactos(contactos); // viene de datos.js

  // Limpiar el formulario
  formulario.reset();

  // Actualizar la pantalla
  renderizarContactos(contactos);
}

// ---- FUNCIÓN: ELIMINAR CONTACTO ----
function eliminarContacto(id) {
  var confirmado = confirm('¿Seguro que quieres eliminar este contacto?');
  if (!confirmado) return;

  // Filtra y queda con todos MENOS el que tiene ese id
  contactos = contactos.filter(function(c) {
    return c.id !== id;
  });

  guardarContactos(contactos);
  renderizarContactos(contactos);
}

// ---- FUNCIÓN: BUSCAR CONTACTOS ----
function buscarContactos(evento) {
  var termino = evento.target.value.toLowerCase().trim();

  if (termino === '') {
    renderizarContactos(contactos);
    return;
  }

  // Busca por nombre, teléfono o email
  var resultados = contactos.filter(function(c) {
    var enNombre   = c.nombre.toLowerCase().includes(termino);
    var enTelefono = c.telefono.toLowerCase().includes(termino);
    var enEmail    = c.email.toLowerCase().includes(termino);
    return enNombre || enTelefono || enEmail;
  });

  renderizarContactos(resultados);
}

// ---- EVENTOS ----
formulario.addEventListener('submit', anadirContacto);
buscador.addEventListener('input', buscarContactos);

// ---- ARRANQUE ----
// Cargamos la lista al abrir la página
renderizarContactos(contactos);
