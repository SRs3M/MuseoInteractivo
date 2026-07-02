# DOCUMENTACIÓN DEL MUSEO VIRTUAL

## Ciencias Naturales - Grado 7°

---

## ¿QUÉ ES ESTE PROYECTO?

Este es un **Museo Virtual Interactivo** que presenta información sobre los efectos del fracking en los ecosistemas de Colombia. Tiene un **sistema de acceso controlado** (requiere código) para que solo personas autorizadas entren.

---

## ESTRUCTURA DEL PROYECTO

```
MuseoInteractivo/
├── index.html          ← Estructura visual (HTML)
├── css/
│   └── styles.css      ← Estilos y colores (CSS)
├── js/
│   └── main.js         ← Lógica y funcionamiento (JavaScript)
├── data.json           ← Base de datos (información del museo)
└── README.md           ← Este archivo
```

---

## CÓMO SE COMUNICAN LOS ARCHIVOS

### Flujo de funcionamiento:

```
1. NAVEGADOR ABRE index.html
   ↓
2. index.html CARGA los estilos
   └─→ Llama: <link rel="stylesheet" href="css/styles.css">
   ↓
3. index.html CARGA la lógica
   └─→ Llama: <script src="js/main.js"></script>
   ↓
4. main.js INICIA y VERIFICA la sesión
   ├─→ Muestra pantalla de acceso
   ├─→ Espera que el usuario ingrese código
   └─→ Si es correcto → Muestra el museo

5. main.js CARGA los datos (Etapa 3)
   └─→ Llama: data.json para mostrar las 6 salas
```

---

## ARCHIVO: index.html

### ¿QUÉ HACE?

Define la **estructura visual** (esqueleto) de la página.

### ESTRUCTURA DIVISIÓN:

#### PARTE 1: PANTALLA DE ACCESO

```html
<section id="pantalla-acceso"></section>
```

- **id="pantalla-acceso"** → Identificador único en HTML
- Contiene:
  - Campo de entrada de contraseña
  - Botón "Entrar al museo"
  - Mensaje de error (aparece si la clave es incorrecta)

#### PARTE 2: CONTENIDO DEL MUSEO

```html
<main id="contenido-museo"></main>
```

- **id="contenido-museo"** → Identificador único en HTML
- Contiene:
  - Encabezado con título
  - Grid de salas (se llenará con JavaScript)

### ELEMENTOS IMPORTANTES:

| Elemento    | id                | Función                                |
| ----------- | ----------------- | -------------------------------------- |
| `<input>`   | `campo-clave`     | Donde el usuario escribe la contraseña |
| `<button>`  | `btn-entrar`      | Botón para verificar la contraseña     |
| `<p>`       | `error-acceso`    | Mensaje de error (inicialmente oculto) |
| `<section>` | `pantalla-acceso` | Pantalla inicial                       |
| `<main>`    | `contenido-museo` | Contenido del museo                    |
| `<section>` | `salas-grid`      | Contenedor para las 6 salas            |

### CONEXIÓN CON OTROS ARCHIVOS:

```html
<link rel="stylesheet" href="css/styles.css" /> ← Carga los estilos
<script src="js/main.js"></script>
← Carga la lógica
```

---

## ARCHIVO: css/styles.css

### ¿QUÉ HACE?

Define los **colores, fuentes, tamaños y espacios** (decoración) de la página.

### ESTRUCTURA:

#### ESTILOS DE PANTALLA DE ACCESO

```css
#pantalla-acceso { ... }
.acceso-card { ... }
#campo-clave { ... }
#btn-entrar { ... }
.error-msg { ... }
```

**Detalles importantes:**

| Propiedad             | Valor                  | ¿Para qué? |
| --------------------- | ---------------------- | ---------- |
| `display: flex`       | Centra el contenido    |
| `background: #185FA5` | Color azul corporativo |
| `display: none`       | Oculta el elemento     |
| `transition: 0.2s`    | Animación suave        |

#### 🏛️ ESTILOS DEL MUSEO

```css
#contenido-museo { display: none; }  ← Inicialmente oculto
.museo-header { ... }                 ← Encabezado azul
.salas-grid { ... }                   ← Grid responsivo
```

### GRID RESPONSIVO:

```css
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
```

- **auto-fit**: Se ajusta automáticamente al tamaño de la pantalla
- **minmax(280px, 1fr)**: Cada columna mide mínimo 280px
- Resultado: En móvil = 1 columna, Tablet = 2 columnas, PC = 3 columnas

### COMUNICACIÓN CON HTML:

- Usa **selectores CSS** para encontrar elementos por `id` y `class`:
  - `#pantalla-acceso` → elemento con id="pantalla-acceso"
  - `#campo-clave` → elemento con id="campo-clave"
  - `.acceso-card` → elementos con class="acceso-card"

---

## ARCHIVO: js/main.js

### ¿QUÉ HACE?

Define la **lógica y funcionamiento** (inteligencia) de la página.

### VARIABLES GLOBALES:

```javascript
const CLAVE_ACCESO = "fracking2026";
```

- Almacena la contraseña del museo
- **IMPORTANTE**: La docente debe cambiarla antes de la feria

```javascript
const pantallaAcceso = document.getElementById("pantalla-acceso");
const contenidoMuseo = document.getElementById("contenido-museo");
const campoClave = document.getElementById("campo-clave");
const btnEntrar = document.getElementById("btn-entrar");
const errorAcceso = document.getElementById("error-acceso");
```

- Estas variables **conectan JavaScript con HTML**
- `document.getElementById()` busca elementos por su `id`
- Guardamos referencias para usarlas luego

### FUNCIÓN 1: `verificarAcceso()`

```javascript
function verificarAcceso() {
  const claveIngresada = campoClave.value.trim();

  if (claveIngresada.toLowerCase() === CLAVE_ACCESO.toLowerCase()) {
    // Clave correcta
    sessionStorage.setItem("museoAcceso", "autorizado");
    pantallaAcceso.style.display = "none"; // Oculta pantalla de acceso
    contenidoMuseo.style.display = "block"; // Muestra el museo
  } else {
    // Clave incorrecta
    errorAcceso.style.display = "block"; // Muestra error
    campoClave.value = ""; // Limpia el campo
    campoClave.focus(); // Enfoca para escribir de nuevo
  }
}
```

**¿Qué hace paso a paso?**

1. Lee el texto del campo de entrada: `campoClave.value`
2. Elimina espacios al inicio/final: `.trim()`
3. Convierte a minúsculas: `.toLowerCase()` (para que "FRACKING2026" = "fracking2026")
4. Compara con la clave correcta
5. Si es correcto:
   - Guarda en `sessionStorage` que el usuario fue autorizado
   - Oculta la pantalla de acceso (`display: "none"`)
   - Muestra el museo (`display: "block"`)
6. Si es incorrecto:
   - Muestra el mensaje de error
   - Limpia el campo para que intente de nuevo

### FUNCIÓN 2: `verificarSesion()`

```javascript
function verificarSesion() {
  if (sessionStorage.getItem("museoAcceso") === "autorizado") {
    pantallaAcceso.style.display = "none";
    contenidoMuseo.style.display = "block";
  }
}
```

**¿Para qué sirve?**

- Si el usuario ya ingresó la contraseña una vez y **recarga la página**, no le pide la contraseña de nuevo
- Usa `sessionStorage` (memoria temporal del navegador)

### EVENTOS (Detecta acciones del usuario):

```javascript
btnEntrar.addEventListener("click", verificarAcceso);
```

- **addEventListener**: "Escucha" acciones del usuario
- **"click"**: Cuando hace clic en el botón
- Ejecuta: `verificarAcceso()`

```javascript
campoClave.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    verificarAcceso();
  }
});
```

- **"keydown"**: Cuando presiona una tecla
- Si es la tecla **Enter**: ejecuta `verificarAcceso()`
- Esto permite presionar Enter en lugar de hacer clic en el botón

### INICIO:

```javascript
verificarSesion();
console.log("Museo Virtual · main.js cargado correctamente.");
```

- Cuando carga la página, verifica si el usuario ya está autorizado
- `console.log()` imprime un mensaje en la consola del navegador (para depuración)

---

## ARCHIVO: data.json

### ¿QUÉ HACE?

Almacena los **datos del museo** en formato JSON.

```json
{
  "obras": []
}
```

### EN LA ETAPA 3, contendrá:

```json
{
    "obras": [
        {
            "id": 1,
            "sala": "Sala 1: Ecosistemas",
            "titulo": "¿Qué es un ecosistema?",
            "descripcion": "...",
            "imagen": "..."
        },
        { ... }
    ]
}
```

### CÓMO USARLO:

En `main.js` (Etapa 3), cargaremos estos datos así:

```javascript
fetch("data.json")
  .then((response) => response.json())
  .then((datos) => {
    // Usar datos.obras para crear las tarjetas
  });
```

---

## FLUJO COMPLETO DE COMUNICACIÓN

```
┌─────────────────────────────────────────────────────────────┐
│ 1. USUARIO ABRE LA PÁGINA                                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. index.html CARGA                                         │
│   ├─ Importa: styles.css (estilos)                          │
│   └─ Importa: main.js (lógica)                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. main.js INICIA                                           │
│   ├─ Busca elementos HTML por su id                         │
│   └─ Ejecuta: verificarSesion()                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
                  ¿Sesión activa?
                   /              \
                 No              Sí
                 /                \
                ↓                  ↓
    ┌───────────────────┐  ┌──────────────────┐
    │ Muestra pantalla  │  │ Muestra museo    │
    │ de acceso         │  │ directamente     │
    │ (requiere clave)  │  │ (usuario ya      │
    └─────────┬─────────┘  │  ingresó antes)  │
              ↓             └──────────────────┘
    ┌───────────────────┐
    │ Usuario ingresa   │
    │ contraseña y hace │
    │ clic en Entrar    │
    └─────────┬─────────┘
              ↓
    ┌───────────────────┐
    │ Se ejecuta        │
    │ verificarAcceso() │
    └─────────┬─────────┘
              ↓
        ¿Contraseña
         correcta?
        /            \
       Sí            No
      /              \
     ↓                ↓
  ┌──────┐        ┌────────┐
  │ Abre │        │ Error  │
  │museo │        │ (Intenta
  └──────┘        │ de nuevo)
                  └────────┘
```

---

## TABLA RESUMEN DE COMUNICACIÓN

| HTML                             | CSS                        | JavaScript                        | Función                         |
| -------------------------------- | -------------------------- | --------------------------------- | ------------------------------- |
| `<input id="campo-clave">`       | `#campo-clave { ... }`     | `campoClave.value`                | Campo para escribir contraseña  |
| `<button id="btn-entrar">`       | `#btn-entrar { ... }`      | `btnEntrar.addEventListener(...)` | Botón para verificar contraseña |
| `<p id="error-acceso">`          | `.error-msg { ... }`       | `errorAcceso.style.display`       | Mensaje de error                |
| `<section id="pantalla-acceso">` | `#pantalla-acceso { ... }` | `pantallaAcceso.style.display`    | Pantalla inicial                |
| `<main id="contenido-museo">`    | `#contenido-museo { ... }` | `contenidoMuseo.style.display`    | Contenido del museo             |
| `<section id="salas-grid">`      | `.salas-grid { ... }`      | (Etapa 3)                         | Contenedor de 6 salas           |

---

## CONCEPTOS CLAVE PARA APRENDER

### 1. **HTML = Estructura (esqueleto)**

- Define qué elementos existen
- Los elementos se identifican con `id` (único) o `class` (múltiples)

### 2. **CSS = Estilos (decoración)**

- Usa selectores para encontrar elementos HTML
- Define cómo se ven (colores, tamaños, posiciones)
- Grid responsivo se adapta a cualquier pantalla

### 3. **JavaScript = Lógica (inteligencia)**

- Busca elementos HTML con `document.getElementById()`
- Modifica propiedades con `elemento.style`
- Escucha eventos con `addEventListener`
- Almacena datos temporales con `sessionStorage`

### 4. **Datos = Contenido**

- JSON es un formato para guardar datos
- Se puede cargar con `fetch()` en JavaScript

---

## PRÓXIMOS PASOS (ETAPA 3)

1. **Llenar data.json** con las 6 salas sobre fracking
2. **Modificar main.js** para:
   - Cargar datos de `data.json` con `fetch()`
   - Crear tarjetas de salas dinámicamente
   - Agregar interactividad (modales, galerías, etc.)
3. **Agregar más estilos** en `styles.css` para las tarjetas

---

## GLOSARIO

| Término            | Significado                                                |
| ------------------ | ---------------------------------------------------------- |
| **HTML**           | Lenguaje para crear la estructura de páginas web           |
| **CSS**            | Lenguaje para decorar y posicionar elementos               |
| **JavaScript**     | Lenguaje para agregar lógica e interactividad              |
| **id**             | Identificador único de un elemento                         |
| **class**          | Clasificador para múltiples elementos con estilo similar   |
| **DOM**            | Árbol de elementos HTML en la memoria del navegador        |
| **event**          | Acción del usuario (clic, escribir, presionar tecla)       |
| **sessionStorage** | Memoria temporal del navegador (se borra al cerrar tab)    |
| **JSON**           | Formato de texto para guardar datos estructurados          |
| **Responsive**     | Se adapta automáticamente a diferentes tamaños de pantalla |

---