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

    // Arrancamos el motor del museo
    // iniciarMuseo() carga el data.json y genera las tarjetas
    // Sin esta línea, el museo aparece vació aunque la clave sea correcta
    iniciarMuseo();
    
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

    // Si la sesión ya estaba activa, también arrancamos el motor
    // (el usuario recargó la página - el museo debe estar listo igual)
    iniciarMuseo();
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
PARTE 4: MOTOR DEL MUSEO
⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸

Aquí vive el corazón del museo.
Este código lee el data.json y construye todo lo que
el visitante ve: las 6 tarjetas de salas y las obras
dentro de cada sala.

FLUJO:
iniciarMuseo()
│
       ├──► cargarDatos()        → lee data.json
       │
       ├──► renderizarSalas()    → genera las 6 tarjetas del inicio
       │
       └──► navegarA()           → muestra inicio o sala interior
       │
       └──► renderizarObras() → genera las obras de una sala
       */
      
      // ── DATOS DE LAS 6 SALAS ──────────────────────────────────
      //
      // Este arreglo guarda la información fija de cada sala:
      // número, nombre, descripción y emoji representativo.
      //
      // ¿Por qué está aquí y no en data.json?
      // Porque esta información nunca cambia — la definió la docente
      // desde el principio. Lo que sí cambia son las OBRAS (data.json).
      // Separar datos fijos de datos variables es una buena práctica.
      //
// CONCEPTO — Arreglo de objetos:
// Un arreglo [] que contiene objetos {} dentro.
// Cada objeto tiene propiedades: numero, nombre, descripcion, emoji.

const SALAS_INFO = [
  {
    numero : 1,
    nombre : "Entrada / Introducción",
    descripcion : "Bienvenido al museo y contexto general del fracking en Colombia",
    emoji : "🏛️"
  },
  {
    numero : 2,
    nombre : "¿Qué es el Fracking?",
    descripcion : "Definición y proceso técnico explicado por los estudiantes",
    emoji : "⛏️"
  },
  {
    numero : 3,
    nombre : "Beneficios del Fracking",
    descripcion : "Análisis de argumentos económicos y energéticos a favor",
    emoji : "📊"
  },
  {
    numero : 4,
    nombre : "Efectos sobre el Agua",
    descripcion : "Contaminación hídrica y acuíferos afectados",
    emoji : "💧"
  },
  {
    numero : 5,
    nombre : "Efectos sobre la contaminación",
    descripcion : "Emisiones de gases y efectos sobre la salud",
    emoji : "⛈️"
  },
  {
    numero : 6,
    nombre : "Efectos sobre el subsuelo",
    descripcion : "Sismicidad inducida y erosión del terreno",
    emoji : "🌎"
  }
];

// ── VARIABLE GLOBAL: todasLasObras ────────────────────────
//
// CONCEPTO — Variable global:
// Vive fuera de todas las funciones. Eso significa que
// TODAS las funciones pueden leerla y modificarla.
//
// ¿Por qué la necesitamos global?
// cargarDatos() trae las obras UNA sola vez.
// Luego navegarA() las necesita para pasarlas a renderizarObras().
// Si no fueran globales, cada función tendría que leer
// el data.json de nuevo — lento e ineficiente.
//
// Empieza vacía. Se llena cuando iniciarMuseo() termina de cargar.

let todasLasObras = [];
//  ↑
//  let (no const) porque su valor CAMBIA cuando cargamos los datos


// ── FUNCIÓN: cargarDatos() ────────────────────────────────
//
// Lee el archivo data.json y devuelve el arreglo de obras.
//
// CONCEPTO — async/await:
// Leer un archivo de internet toma tiempo.
// "async" marca la función como asíncrona (puede esperar).
// "await" pausa la ejecución hasta recibir la respuesta.
// Sin await, JavaScript seguiría ejecutando el resto del código
// antes de que lleguen los datos — y todo fallaría.
//
// CONCEPTO — fetch():
// Es el mensajero. Va al servidor, pide el archivo,
// espera la respuesta y la trae de vuelta.
//
// CONCEPTO — .json():
// Convierte la respuesta (texto plano) en un objeto JavaScript
// que podemos usar con punto: data.obras

async function cargarDatos() {
  const respuesta = await fetch("data.json");
  // ├─ fetch() hace la petición al servidor
  // ├─ await espera hasta que llegue la respuesta
  // └─ respuesta = objeto con la respuesta del servidor
  
  const data = await respuesta.json();
  // ├─ .json() convierte el texto en objeto JavaScript
  // └─ data = { obras: [ {...}, {...}, ... ] }

  return data.obras
  // └─ devolvemos solo el arreglo de obras, no el objeto completo
}

// ── FUNCIÓN: renderizarSalas(obras) ──────────────────────
//
// Recibe el arreglo completo de obras.
// Genera las 6 tarjetas del menú principal.
//
// CONCEPTO — forEach():
// Recorre cada elemento de un arreglo y ejecuta
// una función para cada uno. Como un ciclo for, pero
// más limpio y legible.
//
// CONCEPTO — filter():
// Recorre el arreglo y devuelve uno NUEVO con solo
// los elementos que cumplen la condición.
// El arreglo original nunca se modifica.
//
// CONCEPTO — Template literals (comillas invertidas ` `):
// Permiten escribir texto en varias líneas y mezclar
// variables dentro con ${variable}.
// Así construimos HTML dinámicamente sin concatenar con +.
//
// CONCEPTO — innerHTML:
// Propiedad que representa el HTML interno de un elemento.
// Con = lo reemplazamos. Con += agregamos al final.

function renderizarSalas(obras) {

  // Buscamos el contenedor del grid en HTML
  const grid = document.getElementById("salas-grid");

  // Limpiamos el grid antes de llenarlo
  // Evita duplicar tarjetas si la función se llama varias veces
  grid.innerHTML = "";

  // Recorremos cada sala definida con SALAS_INFO
  SALAS_INFO.forEach(function(sala) {
    // Contamos cuántas obras tiene esta sala en data.json
    // filter() filtra las obras cuyo número de sala coincide
    const totalObras = obras.filter(function(obra) {
      return obra.sala === sala.numero;
      // └─ true = incluir esta obra / false = descartarla
    }).length;
    // └─ .length = cuenta cuántos elementos quedaron

    // Construimos el HTML de la tarjeta con template literal
    // Cada ${} inserta el valor de esa variable en el texto
    const tarjeta = `
      <div class="sala-card" onclick="navegarA(${sala.numero})">
        <div class="sala-card-img">${sala.emoji}</div>
        <div class="sala-card-body">
          <div class="sala-card-num">SALA ${sala.numero}</div>
          <div class="sala-card-title">${sala.nombre}</div>
          <div class="sala-card-desc">${sala.descripcion}</div>
          <div class="sala-card-obras">
            ${totalObras} obra${totalObras !== 1 ? "s" : ""}
          </div>
          <button class="sala-card-btn">Entrar a la sala →</button>
        </div>
      </div>
    `;
    // └─ totalObras !== 1 ? 's' : ''
    //    Si hay más de 1 obra → "obras" (con s)
    //    Si hay exactamente 1 → "obra" (sin s)
    //    Eso se llama operador ternario: condicion ? siTrue : siFalse

    // Agregamos la tarjeta al grid
    grid.innerHTML += tarjeta;
  });
}

// ── FUNCIÓN: navegarA(destino) ────────────────────────────
//
// Controla qué se ve en pantalla: el inicio o una sala interior.
// Oculta lo que no corresponde y muestra lo que sí.
//
// CONCEPTO — SPA (Single Page Application):
// El sitio tiene UNA sola página HTML.
// La "navegación" no recarga la página — solo muestra
// y oculta secciones con style.display.
// Esto hace la navegación instantánea y funciona sin
// internet una vez que la página cargó.
//
// CONCEPTO — querySelectorAll():
// Busca TODOS los elementos que coincidan con el selector CSS.
// Devuelve una lista de elementos (NodeList).
// Similar a getElementById() pero para múltiples elementos.
//
// CONCEPTO — classList:
// Permite agregar, quitar o verificar clases CSS de un elemento.
// .add('activo')    → agrega la clase
// .remove('activo') → quita la clase

function navegarA(destino) {
  const vistaInicio = document.getElementById("vista-inicio");
  const vistaSala = document.getElementById("vista-sala");
  const navBtns = document.querySelectorAll(".nav-btn");
  // └─ trae todos los botones de navegación como una lista

  if(destino === "inicio") {

    // Mostrar inicio, ocultar sala interior
    vistaInicio.style.display = "block";
    vistaSala.style.display = "none";

    // Quitar 'activo' de todos los botones
    // y ponérselo solo al botón Inicio (índice 0)    
    navBtns.forEach(function(btn) {
      btn.classList.remove("activo");
    });
    navBtns[0].classList.add("activo");
    // └─ navBtns[0] = primer botón = "Inicio"
  } else {
    // destino es un número: 1, 2, 3, 4, 5 o 6
    // Ocultar inicio, mostrar sala interior
    vistaInicio.style.display = "none";
    vistaSala.style.display = "block";

    // Marcar el botón de la sala correcta como activo
    // navBtns[0] = Inicio
    // navBtns[1] = Sala 1
    // navBtns[2] = Sala 2 ... etc.
    navBtns.forEach(function(btn) {
      btn.classList.remove("activo");
    });
    navBtns[destino].classList.add("activo");
    // └─ destino = 1 → navBtns[1] = botón "Sala 1"

    // Renderizar las obras de esta sala
    // Usamos todasLasObras (variable global cargada al inicio)
    renderizarObras(destino, todasLasObras);

  }
}

// ── FUNCIÓN: renderizarObras(numeroSala, obras) ───────────
//
// Filtra las obras de la sala seleccionada
// y construye su HTML dentro de la sala interior.
//
// CONCEPTO — if / else if / else:
// Evalúa condiciones en orden.
// Solo entra al primer bloque cuya condición sea verdadera.
// Si ninguna lo es, entra al else.
//
// CONCEPTO — return dentro de una función:
// Detiene la ejecución de la función en ese punto.
// Todo lo que venga después de return no se ejecuta.
// Útil para manejar casos especiales (como sala vacía)
// antes de continuar con el caso normal.
function renderizarObras(numeroSala, obras) {
  // ── Actualizar el banner de la sala ─────────────────────
  // SALAS_INFO[numeroSala - 1] porque los arreglos empiezan en 0
  // Sala 1 → índice 0 / Sala 2 → índice 1 / etc.
  const infoDeSala = SALAS_INFO[numeroSala - 1];
  const banner = document.getElementById("sala-banner");
  banner.innerHTML = `
    <h2>${infoDeSala.emoji} SALA ${numeroSala} - ${infoDeSala.nombre}</h2>
    <p>${infoDeSala.descripcion}</p>
  `;

  // ── Filtrar obras de esta sala ───────────────────────────
  const obrasDeSala = obras.filter(function(obra) {
    return obra.sala === numeroSala;
  });

  const grid = document.getElementById("obras-grid");
  grid.innerHTML = ``;

  // ── Caso especial: sala vacía ────────────────────────────
  // Si no hay obras todavía, mostramos un mensaje provisional
  // return detiene la función aquí — no sigue al forEach
  if(obrasDeSala.length === 0) {
    grid.innerHTML = `
      <div class="obras-vacio">
        <p> Las obras de esta sala estarán disponibles próximamente </p>
        <p> Los estudiantes están preparando su contenido </p>
      </div>
    `;
    return;
  }

  // ── Construir tarjeta de cada obra ───────────────────────
  obrasDeSala.forEach(function(obra) {
    // Decidir qué HTML de media usar según obra.tipo
    // Cada tipo necesita un elemento HTML diferente:
    // video       → <iframe> (incrusta el video de YouTube)
    // imagen      → <img>    (muestra la imagen directamente)
    // presentacion → <a>     (enlace que abre en nueva pestaña)
    let mediaHTML = "";

    if(obra.tipo === "video") {
      mediaHTML = `
        <div class="obra-media">
          <iframe
            src="${obra.url}"
            title="${obra.titulo}"
            allowfullscreen
            loading="lazy">
          </iframe>
        </div>
      `;
      // └─ loading="lazy" = el video no carga hasta que
      //    el usuario hace scroll hacia él. Mejora la velocidad.

    } else if (obra.tipo === "imagen") {
      mediaHTML = `
        <div class="obra-media">
          <img
            src="${obra.url}"
            alt="${obra.titulo}"
            loading="lazy">
          </div>
      `;
      // └─ alt = texto alternativo para lectores de pantalla
      //    y cuando la imagen no carga (accesibilidad)
    } else if (obra.tipo === "presentacion") {
      mediaHTML = `
        <div class="obra-media obra-presentacion">
          <a href="${obra.url}" target="_blank" rel="noopener">
            <div class="presentacion-placeholder">
              📊<br>Ver presentación
            </div>
          </a>
        </div>
      `
      // └─ target="_blank"  = abre en pestaña nueva
      //    rel="noopener"   = buena práctica de seguridad
      //    (evita que la página externa acceda a nuestra página)
    }
    // Construir la tarjeta completa de la obra
    const tarjeta = `
      <div class="obra-card">
        ${mediaHTML}
        <div class="obra-info">
          <span class="obra-tipo ${obra.tipo}">${obra.tipo}</span>
          <div class="obra-title">${obra.titulo}</div>
          ${obra.descripcion
            ? `<div class="obra-desc">${obra.descripcion}</div>` : ""
          }
        </div>
      </div>
    `;
    // └─ obra.descripcion ? ... : ''
    //    Si la descripción existe → la muestra
    //    Si está vacía o no existe → no muestra nada
    //    (Operador ternario aplicado a HTML opcional)

    grid.innerHTML += tarjeta;
  });
}



// ── FUNCIÓN: iniciarMuseo() ───────────────────────────────
//
// Es el director de orquesta. Se ejecuta una sola vez
// cuando el visitante entra al museo (clave correcta o
// sesión activa). Coordina todo el proceso de carga.
//
// CONCEPTO — try / catch:
// "try" = intenta ejecutar el código dentro.
// "catch" = si algo falla dentro del try, captura el error
//           y ejecuta el código alternativo.
// Sin try/catch, un error rompería el sitio completamente.
// Con try/catch, podemos mostrar un mensaje y seguir.
//
// CONCEPTO — async en iniciarMuseo():
// Es async porque llama a cargarDatos() que usa await.
// Una función que llama a otra función async
// también debe ser async.

async function iniciarMuseo() {
  console.log("Iniciando museo virtual...");
  console.log("ey bro tu que haces aqui? Tu no deberías ver la consola...");

  try {

    // Cargar las obras del data.json
    todasLasObras = await cargarDatos();
    // ├─ await espera a que cargarDatos() termine
    // └─ el resultado se guarda en la variable global

    console.log(`${todasLasObras.length} obras cargadas desde data.json`);
    // └─ Template literal en console.log para ver cuántas obras llegaron

    // Generar las 6 tarjetas del menú principal
    renderizarSalas(todasLasObras);

    console.log("Museo listo");
  } catch(error) {
    // Si algo falla (data.json no existe, tiene error de sintaxis,
    // no hay conexión) — capturamos el error sin romper el sitio
    console.error("Error al cargar el museo: ", error);
    // └─ console.error() muestra el error en rojo en la consola
    //    Así Juan José sabe exactamente qué falló y dónde
  }
} 



/* ⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸
   PARTE 5: Arranque
   ⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸⩸
*/

// Verificamos si el usuario ya ingresó contraseña (sesión activa)
verificarSesion();

// Mensaje en la consola (para depuración)
// En Chrome/Firefox: clic derecho → Inspeccionar → Consola
console.log("Museo Virtual · main.js cargado correctamente.");