// ============================================
// datos.js — Gestión de datos y almacenamiento
// ============================================
// Este archivo se encarga de:
//   1. Guardar contactos en localStorage (memoria del navegador)
//   2. Cargar contactos al iniciar la app
//   3. Datos de ejemplo para empezar
// ============================================

// Clave usada para guardar en localStorage
var CLAVE_STORAGE = 'mis-contactos';

// Contactos de ejemplo para que la app no arranque vacía
var CONTACTOS_INICIALES = [
  {
    id: 1,
    nombre: 'Ana García',
    telefono: '612345678',
    email: 'ana.garcia@email.com',
    categoria: 'trabajo'
  },
  {
    id: 2,
    nombre: 'Carlos López',
    telefono: '698765432',
    email: 'carlos@gmail.com',
    categoria: 'personal'
  },
  {
    id: 3,
    nombre: 'María Fernández',
    telefono: '611223344',
    email: '',
    categoria: 'familia'
  }
];

// ---- FUNCIONES DE ALMACENAMIENTO ----

// Carga los contactos desde el navegador
// Si no hay ninguno guardado, devuelve los de ejemplo
function cargarContactos() {
  var guardados = localStorage.getItem(CLAVE_STORAGE);
  if (guardados) {
    return JSON.parse(guardados);
  }
  return CONTACTOS_INICIALES;
}

// Guarda la lista de contactos en el navegador
function guardarContactos(contactos) {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(contactos));
}

// Genera un ID único para cada contacto nuevo
// Busca el ID más alto de la lista y devuelve ese número más 1.
// Si la lista está vacía, devuelve 1.
function generarId(contactos) {
  if (contactos.length === 0) {
    return 1;
  }
  var maxId = 0;
  for (var i = 0; i < contactos.length; i++) {
    if (contactos[i].id > maxId) {
      maxId = contactos[i].id;
    }
  }
  return maxId + 1;
}
