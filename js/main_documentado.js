// ══════════════════════════════════════════════════════════════════════════
// 🏛️ MUSEO VIRTUAL DE CIENCIAS NATURALES
// main.js — Lógica principal e interactividad
// Autor: Estudiante de 7° grado · Proyecto académico 2026
// ══════════════════════════════════════════════════════════════════════════

/* ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
   PARTE 1: CONFIGURACIÓN INICIAL
   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
   
   Aquí definimos la contraseña y buscamos los elementos HTML que necesitamos.
   ¡IMPORTANTE!: La contraseña debe ser única y comunicarse solo a los 
   visitantes autorizados del museo.
*/

// ── CONTRASEÑA DEL MUSEO ─────────────────────────────────────────────
// const = "constante" (no puede cambiar durante el programa)
// La docente define esta clave y la comunica a los visitantes.
// ⚠️ CAMBIAR ANTES DE LA FERIA y hacer git push.
const CLAVE_ACCESO = "fracking2026";

// ── REFERENCIAS A ELEMENTOS HTML ─────────────────────────────────────
// Estas variables conectan JavaScript con HTML.
// document.getElementById() busca el elemento por su "id" en el HTML.
// Guardamos referencias para usarlas múltiples veces sin buscar de nuevo.

const pantallaAcceso = document.getElementById("pantalla-acceso");
// ↑ La pantalla inicial donde se pide la contraseña

const contenidoMuseo = document.getElementById("contenido-museo");
// ↑ El contenido principal (solo visible después de ingresar la contraseña)

const campoClave = document.getElementById("campo-clave");
// ↑ El campo <input> donde el usuario escribe la contraseña

const btnEntrar = document.getElementById("btn-entrar");
// ↑ El botón "Entrar al museo"

const errorAcceso = document.getElementById("error-acceso");
// ↑ El mensaje de error (se muestra si la contraseña es incorrecta)

/* ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
   PARTE 2: FUNCIONES PRINCIPALES
   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
   
   Aquí definimos las funciones que hacen funcionar el museo.
*/

// ── FUNCIÓN 1: verificarAcceso() ─────────────────────────────────────
// Esta función se ejecuta cuando el usuario intenta entrar al museo.
// Verifica si la contraseña es correcta.
function verificarAcceso() {
  
  // Paso 1: Obtener el texto que escribió el usuario
  const claveIngresada = campoClave.value.trim();
  //           ├─ .value = obtiene el texto del campo de entrada
  //           └─ .trim() = elimina espacios al inicio y final
  
  // Paso 2: Comparar la contraseña ingresada con la correcta
  if (claveIngresada.toLowerCase() === CLAVE_ACCESO.toLowerCase()) {
    //    ├─ .toLowerCase() = convierte a minúsculas
    //    │  (así "FRACKING2026" = "fracking2026")
    //    └─ === = operador de comparación (igual a)
    
    // ✅ CONTRASEÑA CORRECTA
    // Guardamos que el usuario fue autorizado (en la memoria del navegador)
    sessionStorage.setItem("museoAcceso", "autorizado");
    // ├─ sessionStorage = memoria temporal del navegador
    // ├─ .setItem() = guarda un dato
    // ├─ "museoAcceso" = nombre del dato
    // └─ "autorizado" = valor guardado
    
    // Ocultamos la pantalla de acceso
    pantallaAcceso.style.display = "none";
    // └─ .style.display = "none" = oculta el elemento
    
    // Mostramos el contenido del museo
    contenidoMuseo.style.display = "block";
    // └─ .style.display = "block" = muestra el elemento
    
  } else {
    // ❌ CONTRASEÑA INCORRECTA
    
    // Mostramos el mensaje de error
    errorAcceso.style.display = "block";
    
    // Limpiamos el campo para que intente de nuevo
    campoClave.value = "";
    // └─ .value = "" = borra el contenido del campo
    
    // Enfocamos el campo para que el usuario siga escribiendo
    campoClave.focus();
    // └─ .focus() = pone el cursor en el campo
  }
}

// ── FUNCIÓN 2: verificarSesion() ────────────────────────────────────
// Esta función verifica si el usuario ya ingresó la contraseña antes.
// Si la sesión está activa, muestra el museo directamente (sin pedir la clave).
// 
// ¿Por qué es útil?
// Si el usuario recarga la página (F5 o Ctrl+R), no tiene que escribir 
// la contraseña de nuevo.
function verificarSesion() {
  
  // Verificamos si existe el dato guardado
  if (sessionStorage.getItem("museoAcceso") === "autorizado") {
    // ├─ .getItem() = obtiene un dato guardado
    // └─ === "autorizado" = verifica si es el valor correcto
    
    // Si sí existe, ocultamos la pantalla de acceso
    pantallaAcceso.style.display = "none";
    
    // Y mostramos el museo
    contenidoMuseo.style.display = "block";
  }
  // Si la sesión NO existe, no hacemos nada (se queda en la pantalla de acceso)
}

/* ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
   PARTE 3: EVENTOS (Escucha acciones del usuario)
   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
   
   Los eventos son acciones que el usuario realiza:
   - Clic en un botón
   - Presionar una tecla
   - Escribir en un campo
   - Pasar el mouse
   
   addEventListener = "escucha" eventos
*/

// ── EVENTO 1: Clic en el botón "Entrar" ─────────────────────────────
btnEntrar.addEventListener("click", verificarAcceso);
// ├─ addEventListener = "escucha" eventos
// ├─ "click" = tipo de evento (hacer clic con el mouse)
// ├─ verificarAcceso = función que se ejecuta cuando ocurre el evento
// └─ cuando el usuario hace clic en el botón → se ejecuta verificarAcceso()

// ── EVENTO 2: Presionar la tecla Enter en el campo de contraseña ────
campoClave.addEventListener("keydown", function(evento) {
  // ├─ "keydown" = evento que ocurre cuando se presiona una tecla
  // ├─ function(evento) = función anónima que recibe el evento
  // └─ evento = objeto que contiene información de la tecla presionada
  
  if (evento.key === "Enter") {
    // ├─ evento.key = identifica qué tecla se presionó
    // └─ === "Enter" = verifica si fue la tecla Enter
    
    verificarAcceso();
    // └─ Si es Enter, ejecuta la verificación (igual que hacer clic)
  }
});

// ¿POR QUÉ ES ÚTIL?
// Los usuarios esperan poder presionar Enter para enviar contraseñas.
// Esto mejora la experiencia del usuario.

/* ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
   PARTE 4: INICIALIZACIÓN (Código que se ejecuta al cargar la página)
   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/

// Verificamos si el usuario ya ingresó la contraseña (sesión activa)
verificarSesion();

// Mensaje de confirmación en la consola (para depuración)
// En Chrome/Firefox: clic derecho → Inspeccionar → Consola
console.log("Museo Virtual · main.js cargado correctamente.");
