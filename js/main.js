// ══════════════════════════════════════════════════════════
// MUSEO VIRTUAL DE CIENCIAS NATURALES
// main.js — Lógica principal e interactividad
// Autor: Estudiante de 7° grado · Proyecto académico 2026
// ══════════════════════════════════════════════════════════

/* ⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸
   PARTE 1: CONFIGURACIÓN INICIAL
   ⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸
   
   Aquí definimos la contraseña y buscamos los elementos HTML 
   que necesitamos.
   ¡IMPORTANTE!: La contraseña debe ser única y comunicarse 
   solo a los visitantes autorizados del museo.
*/

// ── CONTRASEÑA DEL MUSEO ──────────────────────────────────
// const = constante (no puede cambiar durante el programa)
// La docente define esta clave y la comunica a los visitantes.
// CAMBIAR ANTES DE LA FERIA y hacer git push.
const CLAVE_ACCESO = "123";

// ── REFERENCIAS A ELEMENTOS HTML ──────────────────────────
// Estas variables conectan JavaScript con HTML.
// document.getElementById() busca el elemento por su id.
// Guardamos referencias para usarlas sin buscar de nuevo.

const pantallaAcceso = document.getElementById("pantalla-acceso");
// ↑ La pantalla inicial donde se pide la contraseña

const contenidoMuseo = document.getElementById("contenido-museo");
// ↑ El contenido (solo visible después de ingresar contraseña)

const campoClave = document.getElementById("campo-clave");
// ↑ El campo <input> donde el usuario escribe la contraseña

const btnEntrar = document.getElementById("btn-entrar");
// ↑ El botón "Entrar al museo"

const errorAcceso = document.getElementById("error-acceso");
// ↑ El mensaje de error (si la contraseña es incorrecta)

/* ⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸
   PARTE 2: FUNCIONES PRINCIPALES
   ⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸
   
   Aquí definimos las funciones que hacen funcionar el museo.
*/

// ── FUNCIÓN 1: verificarAcceso() ──────────────────────────
// Se ejecuta cuando el usuario intenta entrar al museo.
// Verifica si la contraseña es correcta.
function verificarAcceso() {
  
  // Paso 1: Obtener el texto que escribió el usuario
  const claveIngresada = campoClave.value.trim();
  //           ├─ .value = obtiene el texto del campo
  //           └─ .trim() = elimina espacios al inicio/final
  
  // Paso 2: Comparar la contraseña ingresada con la correcta
  if (claveIngresada.toLowerCase() === CLAVE_ACCESO.toLowerCase()) {
    //    ├─ .toLowerCase() = convierte a minúsculas
    //    │  (así "FRACKING2026" = "fracking2026")
    //    └─ === = comparación (igual a)
    
    // CONTRASEÑA CORRECTA
    // Guardamos que el usuario fue autorizado
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
    // CONTRASEÑA INCORRECTA
    
    // Mostramos el mensaje de error
    errorAcceso.style.display = "block";
    
    // Limpiamos el campo para que intente de nuevo
    campoClave.value = "";
    // └─ .value = "" = borra el contenido del campo
    
    // Enfocamos el campo para que siga escribiendo
    campoClave.focus();
    // └─ .focus() = pone el cursor en el campo
  }
}

// ── FUNCIÓN 2: verificarSesion() ──────────────────────────
// Verifica si el usuario ya ingresó la contraseña antes.
// Si la sesión está activa, muestra el museo directamente.
// 
// ¿Para qué sirve?
// Si el usuario recarga la página (F5), no tiene que escribir 
// la contraseña de nuevo. ¡Experiencia de usuario mejorada!
function verificarSesion() {
  
  // Verificamos si existe el dato guardado
  if (sessionStorage.getItem("museoAcceso") === "autorizado") {
    // ├─ .getItem() = obtiene un dato guardado
    // └─ === "autorizado" = verifica si es correcto
    
    // Si sí existe, ocultamos la pantalla de acceso
    pantallaAcceso.style.display = "none";
    
    // Y mostramos el museo
    contenidoMuseo.style.display = "block";
  }
  // Si NO existe, no hacemos nada (se queda esperando contraseña)
}

/* ⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸
   PARTE 3: EVENTOS (Escucha acciones del usuario)
   ⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸
   
   Los eventos son acciones que el usuario realiza:
   - Clic en un botón
   - Presionar una tecla
   - Escribir en un campo
   - Pasar el mouse
   
   addEventListener = "escucha" eventos
*/

// ── EVENTO 1: Clic en el botón "Entrar" ───────────────────
btnEntrar.addEventListener("click", verificarAcceso);
// ├─ addEventListener = "escucha" eventos
// ├─ "click" = tipo de evento (clic del mouse)
// ├─ verificarAcceso = función que se ejecuta
// └─ cuando usuario hace clic → se ejecuta verificarAcceso()

// ── EVENTO 2: Presionar tecla Enter en el campo ─────────
campoClave.addEventListener("keydown", function(evento) {
  // ├─ "keydown" = evento cuando se presiona una tecla
  // ├─ function(evento) = función que recibe el evento
  // └─ evento = objeto con info de la tecla presionada
  
  if (evento.key === "Enter") {
    // ├─ evento.key = identifica qué tecla se presionó
    // └─ === "Enter" = verifica si fue la tecla Enter
    
    verificarAcceso();
    // └─ Si es Enter, ejecuta la verificación
  }
});

// ¿POR QUÉ ES ÚTIL?
// Los usuarios esperan poder presionar Enter en campos de contraseña.
// Esto mejora la experiencia del usuario.

/* ⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸
   PARTE 4: INICIALIZACIÓN (Código al cargar la página)
   ⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸
*/

// Verificamos si el usuario ya ingresó contraseña (sesión activa)
verificarSesion();

// Mensaje en la consola (para depuración)
// En Chrome/Firefox: clic derecho → Inspeccionar → Consola
console.log("Museo Virtual · main.js cargado correctamente.");