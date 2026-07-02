# GUÍA DEL DESARROLLADOR

## Trucos y Secretos para Entender y Modificar el Código

---

## HERRAMIENTAS DEL NAVEGADOR

### Abrir las "Herramientas de Desarrollador"

En **Chrome, Firefox, Edge:**

```
Clic derecho → Inspeccionar (o presiona F12)
```

### Las 3 pestañas más útiles:

#### 1. ELEMENTOS (Elements)

- Ve el HTML en vivo
- Haz cambios temporales (se pierden al recargar)
- Prueba cambios antes de editar el código real
- **Uso:** Click derecho en un elemento → Inspeccionar

#### 2. ESTILOS (Styles)

- Ve qué CSS se aplica a cada elemento
- Prueba cambios de colores, tamaños, etc.
- Ve qué elemento está siendo afectado
- **Uso:** Selecciona un elemento en "Elementos" → ve los estilos

#### 3. CONSOLA (Console)

- Lee mensajes de JavaScript
- Ejecuta comandos JavaScript
- Busca errores (messages rojos)
- **Uso:** Presiona F12 → pestaña "Consola"

---

## DEPURACIÓN (Debugging)

### Mensajes en la consola

**Agregar mensajes propios:**

```javascript
console.log("Este es un mensaje"); // Azul
console.warn("Esto es una advertencia"); // Amarillo
console.error("Esto es un error"); // Rojo
```

**En main.js ya hay uno:**

```javascript
console.log("Museo Virtual · main.js cargado correctamente.");
```

### Probar comandos en la consola

En la consola, escribe:

```javascript
// Ver el contenido de una variable
campoClave.value;

// Cambiar propiedades
pantallaAcceso.style.backgroundColor = "red";

// Ejecutar funciones
verificarAcceso();

// Ver datos guardados
sessionStorage.getItem("museoAcceso");
```

---

## MODIFICACIONES COMUNES

### 1. Cambiar la contraseña

**Archivo:** `js/main.js`
**Línea:** 17

```javascript
// Antes:
const CLAVE_ACCESO = "fracking2026";

// Después:
const CLAVE_ACCESO = "mi-nueva-clave";
```

### 2. Cambiar el color azul a otro

**Archivo:** `css/styles.css`

Busca `#185FA5` (azul corporativo) y reemplaza:

```css
/* Todas estas líneas usan el color azul */
background: #185fa5;
color: #185fa5;
border-color: #185fa5;
```

**Códigos de color útiles:**

- `#FF0000` = Rojo
- `#00FF00` = Verde
- `#0000FF` = Azul puro
- `#FFD700` = Oro
- `#FF69B4` = Rosa

### 3. Cambiar el mensaje de error

**Archivo:** `index.html`

Busca:

```html
<p id="error-acceso" class="error-msg">
  Código incorrecto. Inténtalo de nuevo.
</p>
```

Cambia el texto:

```html
<p id="error-acceso" class="error-msg">
  ¡Contraseña incorrecta! Intenta de nuevo.
</p>
```

### 4. Cambiar el título del museo

**Archivo:** `index.html`

```html
<title>Museo Virtual de Ciencias Naturales</title>
<!-- Cambia a: -->
<title>Mi Museo Virtual sobre Fracking</title>
```

### 5. Cambiar el tema del museo

**Archivo:** `index.html`

```html
<header class="museo-header">
  <h1>Museo Virtual de Ciencias Naturales</h1>
  <p>Efectos del Fracking en los ecosistemas de Colombia</p>
  <!-- Cambia el segundo párrafo: -->
</header>
```

---

## TRUCOS DE CÓDIGO

### Truco 1: Agregar más tiempo antes de mostrar el museo

**Problema:** Quiero agregar una animación de carga.
**Solución:** Usa `setTimeout()`

En `main.js`, en la función `verificarAcceso()`:

```javascript
// Después de: sessionStorage.setItem("museoAcceso", "autorizado");

setTimeout(function () {
  pantallaAcceso.style.display = "none";
  contenidoMuseo.style.display = "block";
}, 1000); // 1000 milisegundos = 1 segundo
```

### Truco 2: Hacer que la contraseña sea más flexible

**Problema:** El usuario escribe espacios y no funciona.
**Solución:** Ya está hecho con `.trim()`

Pero puedes mejorar:

```javascript
// Opción 1: Acepta variaciones
const claveIngresada = campoClave.value.trim().toLowerCase();
const claveGuardada = CLAVE_ACCESO.toLowerCase();

// Opción 2: Remueve todos los espacios
const sinEspacios = claveIngresada.replaceAll(" ", "");
```

### Truco 3: Registrar intentos fallidos

**Problema:** Quiero saber cuántas veces falló.
**Solución:** Agrega un contador

En `main.js`, después de las variables globales:

```javascript
let intentosFallidos = 0; // Contador
```

En la función `verificarAcceso()`, en la parte del error:

```javascript
} else {
  intentosFallidos++;
  console.log("Intento #" + intentosFallidos);

  // Si falló 3 veces, bloquea por 10 segundos
  if (intentosFallidos >= 3) {
    btnEntrar.disabled = true;
    console.warn("¡Demasiados intentos! Espera 10 segundos.");

    setTimeout(function() {
      btnEntrar.disabled = false;
      intentosFallidos = 0;
    }, 10000);
  }

  errorAcceso.style.display = "block";
  campoClave.value = "";
  campoClave.focus();
}
```

### Truco 4: Agregar un botón "Salir"

**Archivo:** `index.html`

Después del `<section class="salas-grid">`, agrega:

```html
<button id="btn-salir" class="btn-salir">Salir del museo</button>
```

**Archivo:** `css/styles.css`

Agrega:

```css
.btn-salir {
  display: block;
  margin: 2rem auto;
  padding: 0.75rem 2rem;
  background: #c62828;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-salir:hover {
  background: #a01010;
}
```

**Archivo:** `js/main.js`

Agrega después de `verificarSesion();`:

```javascript
const btnSalir = document.getElementById("btn-salir");

btnSalir.addEventListener("click", function () {
  sessionStorage.removeItem("museoAcceso");
  pantallaAcceso.style.display = "flex";
  contenidoMuseo.style.display = "none";
  campoClave.value = "";
  campoClave.focus();
});
```

---

## RESOLVER PROBLEMAS COMUNES

### Problema 1: "La página no muestra nada"

**Causas posibles:**

1. El archivo `index.html` está corrupto
2. Las rutas de CSS/JS son incorrectas
3. Error en JavaScript (check la consola)

**Solución:**

1. Abre las herramientas (F12)
2. Ve a la pestaña "Consola"
3. Busca mensajes en rojo (errores)
4. Lee el error y corrígelo

### Problema 2: "El botón no funciona"

**Causas posibles:**

1. El `id` en HTML no coincide con el de JavaScript
2. Hay un error de sintaxis en JavaScript
3. El evento no está bien configurado

**Solución:**

```javascript
// Verifica en la consola:
console.log(btnEntrar); // Debe mostrar el botón, no "undefined"
```

### Problema 3: "Los estilos no se aplican"

**Causas posibles:**

1. La ruta del CSS es incorrecta
2. Hay un error de sintaxis en CSS
3. La especificidad del CSS es baja

**Solución:**

1. Verifica en las herramientas: F12 → Red → ve si el CSS se carga
2. Recarga con Ctrl+Shift+R (recarga forzada)

---

## BUENAS PRÁCTICAS

### 1. Nombra variables claramente

```javascript
// Malo
const x = document.getElementById("campo-clave");

// Bien
const campoClave = document.getElementById("campo-clave");
```

### 2. Agrega comentarios a cambios importantes

```javascript
// Bien
// CAMBIO: Agregué bloqueo después de 3 intentos fallidos
if (intentosFallidos >= 3) {
  // ...
}
```

### 3. Usa nombres consistentes

```javascript
// Bien
const btnEntrar = document.getElementById("btn-entrar");
const btnSalir = document.getElementById("btn-salir");
// Todos comienzan con "btn-"

// Malo
const botonEntrar = document.getElementById("btn-entrar");
const botoSalida = document.getElementById("btn-salir");
// Nomenclatura inconsistente
```

### 4. Organiza el código en secciones

```javascript
// ══════ CONFIGURACIÓN ══════
const CLAVE_ACCESO = "...";

// ══════ REFERENCIAS HTML ══════
const pantallaAcceso = ...;

// ══════ FUNCIONES ══════
function verificarAcceso() { ... }

// ══════ EVENTOS ══════
btnEntrar.addEventListener(...);

// ══════ INICIO ══════
verificarSesion();
```

---

## PASOS PARA AGREGAR CARACTERÍSTICAS

### Ejemplo: Agregar un campo para el nombre del visitante

#### PASO 1: Agregar HTML

```html
<input type="text" id="nombre-visitante" placeholder="Tu nombre" />
```

#### PASO 2: Agregar CSS

```css
#nombre-visitante {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1.5px solid #dddddd;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 0.75rem;
}
```

#### PASO 3: Agregar JavaScript

```javascript
// Referencia
const nombreVisitante = document.getElementById("nombre-visitante");

// En verificarAcceso(), guardar el nombre:
sessionStorage.setItem("nombre", nombreVisitante.value);

// Leer el nombre después:
const nombre = sessionStorage.getItem("nombre");
console.log("Bienvenido, " + nombre);
```

---

## PRUEBAS ÚTILES

### Test 1: ¿Funciona en móvil?

1. En Chrome: F12 → clic en el icono de celular (arriba a la izquierda)
2. Selecciona diferentes tamaños de pantalla
3. Verifica que todo se vea bien

### Test 2: ¿Funciona la contraseña?

En la consola, prueba:

```javascript
// Debe mostrar "autorizado"
sessionStorage.getItem("museoAcceso");
```

### Test 3: ¿Se cargan todos los archivos?

F12 → pestaña "Red" → recarga la página

- Verifica que index.html, styles.css y main.js aparezcan
- Verifica que el estado sea "200" (éxito)

---

## RECURSOS ÚTILES

- **Mozilla Web Docs:** mdn.org (documentación oficial)
- **W3Schools:** w3schools.com (tutoriales)
- **CodePen:** codepen.io (ejemplos vivos)
- **Stack Overflow:** stackoverflow.com (respuestas a preguntas)

---

## PROYECTO FINAL

**Propuesta de Etapa 3:**

1. **Llenar data.json** con las 6 salas
2. **Cargar datos** con fetch() en main.js
3. **Generar tarjetas** dinámicamente
4. **Agregar interactividad:** Click en tarjeta → ver detalles
5. **Agregar búsqueda:** Campo para filtrar salas
6. **Agregar multimedia:** Imágenes, videos, audios

---