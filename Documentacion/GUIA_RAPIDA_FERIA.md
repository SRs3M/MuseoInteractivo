# GUÍA RÁPIDA - MUSEO VIRTUAL

## Para Presentar en la Feria de Ciencias

---

## ¿QUÉ ES UN MUSEO VIRTUAL?

Un **museo digital interactivo** que puedes ver en cualquier navegador (Google Chrome, Firefox, Edge, Safari).

- No requiere instalación
- Funciona en celular, tablet y computadora
- Protegido con contraseña de acceso
- Tema: **Efectos del Fracking en Colombia**

---

## CUANDO ABRES LA PÁGINA...

```
1️⃣ El navegador abre index.html
   ↓
2️⃣ Carga los estilos (CSS) → la página se ve bonita
   ↓
3️⃣ Carga la lógica (JavaScript) → la página funciona
   ↓
4️⃣ JavaScript revisa: ¿El usuario ya entró antes?
   ├─ NO → Muestra pantalla de acceso (pide contraseña)
   └─ SÍ → Muestra el museo directo (sin pedir contraseña)
```

---

## PANTALLA DE ACCESO

**¿Por qué tiene contraseña?**

- Solo personas autorizadas pueden ver el museo
- La docente controla quién entra
- Es seguro y educativo

**¿Cómo funciona?**

```
Usuario escribe contraseña
         ↓
Hace clic en "Entrar al museo"
         ↓
JavaScript verifica:
  ├─ ¿Es "fracking2026"?
  │   └─ SÍ → Abre el museo ✅
  └─ ¿Es otro texto?
      └─ NO → Muestra error ❌
```

---

## ESTRUCTURA DE CARPETAS

```
MuseoInteractivo/
│
├── index.html ..................... EL ESQUELETO (estructura)
├── css/
│   └── styles.css ................ LA DECORACIÓN (colores, fuentes)
├── js/
│   └── main.js ................... EL CEREBRO (lógica, funciona)
├── data.json ..................... LOS DATOS (información del museo)
└── DOCUMENTACION.md .............. ESTE ARCHIVO
```

---

## ARCHIVO: index.html (Estructura)

**Piensa en una página web como un edificio:**

```
index.html = el PLANO del edificio
```

**Tiene 2 secciones principales:**

### Sección 1: PANTALLA DE ACCESO

```html
<section id="pantalla-acceso">
  <!-- Campo para escribir contraseña -->
  <!-- Botón "Entrar" -->
  <!-- Mensaje de error -->
</section>
```

### Sección 2: CONTENIDO DEL MUSEO

```html
<main id="contenido-museo">
  <!-- Encabezado del museo -->
  <!-- Grid de 6 salas (se cargará en Etapa 3) -->
</main>
```

**Cómo se conecta con otros archivos:**

- `<link>` → carga CSS (decoración)
- `<script>` → carga JavaScript (lógica)

---

## ARCHIVO: styles.css (Decoración)

**Piensa en CSS como la DECORACIÓN del edificio:**

```
styles.css = colores, fuentes, formas, espacios
```

### Lo que define:

#### PANTALLA DE ACCESO:

- **#pantalla-acceso** → Fondo azul claro, centrado, ocupa toda la pantalla
- **.acceso-card** → Tarjeta blanca, redondeada, con sombra
- **#campo-clave** → Campo gris, borde azul al enfocarse
- **#btn-entrar** → Botón azul, cambia a azul más oscuro al pasar mouse
- ⚠️ **.error-msg** → Texto rojo, oculto (aparece si hay error)

#### MUSEO:

-  **#contenido-museo** → Oculto inicialmente, se muestra con JavaScript
-  **.museo-header** → Encabezado azul con título
-  **.salas-grid** → Grid que se adapta:
  - Celular: 1 columna
  - Tablet: 2 columnas
  - Computadora: 3 columnas

**Concepto clave:** CSS usa "selectores" para encontrar elementos:

- `#pantalla-acceso` → busca el elemento con `id="pantalla-acceso"`
- `.acceso-card` → busca elementos con `class="acceso-card"`

---

## ARCHIVO: main.js (Lógica / Inteligencia)

**Piensa en JavaScript como el CEREBRO del edificio:**

```
main.js = acciones, decisiones, memoria, interactividad
```

### PARTE 1: Variables globales

```javascript
const CLAVE_ACCESO = "fracking2026";
```

- Almacena la contraseña correcta
- **IMPORTANTE:** Debe ser única

```javascript
const pantallaAcceso = document.getElementById("pantalla-acceso");
const contenidoMuseo = document.getElementById("contenido-museo");
const campoClave = document.getElementById("campo-clave");
const btnEntrar = document.getElementById("btn-entrar");
const errorAcceso = document.getElementById("error-acceso");
```

- Estas variables **conectan JavaScript con HTML**
- `document.getElementById()` busca elementos por su `id`
- Las guardamos para usar múltiples veces sin buscar de nuevo

### PARTE 2: Función 1 - verificarAcceso()

**¿QUÉ HACE?**
Verifica si la contraseña es correcta cuando el usuario hace clic en "Entrar".

**PASO A PASO:**

```javascript
const claveIngresada = campoClave.value.trim();
```

- `.value` = obtiene el texto que escribió el usuario
- `.trim()` = elimina espacios al inicio y final
- Guardamos en la variable `claveIngresada`

```javascript
if (claveIngresada.toLowerCase() === CLAVE_ACCESO.toLowerCase()) {
```

- `.toLowerCase()` = convierte a minúsculas
- **Razón:** Así no importa si escribe "FRACKING2026" o "fracking2026"
- `===` = compara si son iguales

```javascript
// SI ES CORRECTA:
sessionStorage.setItem("museoAcceso", "autorizado");
pantallaAcceso.style.display = "none"; // Oculta acceso
contenidoMuseo.style.display = "block"; // Muestra museo
```

- `sessionStorage` = memoria temporal del navegador
- `.setItem()` = guarda un dato
- `.style.display = "none"` = oculta el elemento
- `.style.display = "block"` = muestra el elemento

```javascript
// SI ES INCORRECTA:
errorAcceso.style.display = "block"; // Muestra error
campoClave.value = ""; // Limpia el campo
campoClave.focus(); // Enfoca para escribir
```

### PARTE 3: Función 2 - verificarSesion()

**¿QUÉ HACE?**
Si el usuario ya ingresó la contraseña y recarga la página, no se la pide de nuevo.

```javascript
if (sessionStorage.getItem("museoAcceso") === "autorizado") {
  pantallaAcceso.style.display = "none";
  contenidoMuseo.style.display = "block";
}
```

- `.getItem()` = obtiene un dato guardado
- Si existe y es "autorizado" → muestra el museo directamente

### PARTE 4: Eventos

**EVENTO 1: Clic en botón**

```javascript
btnEntrar.addEventListener("click", verificarAcceso);
```

- `addEventListener` = "escucha" acciones del usuario
- `"click"` = cuando hace clic
- `verificarAcceso` = función que se ejecuta

**EVENTO 2: Tecla Enter**

```javascript
campoClave.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    verificarAcceso();
  }
});
```

- `"keydown"` = cuando presiona una tecla
- `evento.key === "Enter"` = verifica si fue Enter
- Esto permite presionar Enter en lugar de hacer clic

---

## ARCHIVO: data.json (Datos)

**Piensa en data.json como la BIBLIOTECA del museo:**

```
data.json = información (texto, imágenes, datos)
```

**AHORA ESTÁ VACÍO:**

```json
{
  "obras": []
}
```

**EN LA ETAPA 3, CONTENDRÁ LAS 6 SALAS:**

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
        {
            "id": 2,
            "sala": "Sala 2: Petróleo y Fracking",
            ...
        }
    ]
}
```

**¿CÓMO SE USA?**
En main.js (Etapa 3), se cargará así:

```javascript
fetch("data.json")
  .then((response) => response.json())
  .then((datos) => {
    // Usa datos.obras para crear las tarjetas
  });
```

---

## DIAGRAMA DE COMUNICACIÓN

```
                    ┌─────────────────────────┐
                    │   NAVEGADOR DEL USUARIO │
                    └────────────┬────────────┘
                                 ↓
                    ┌─────────────────────────┐
                    │   index.html CARGA      │
                    ├─────────────────────────┤
                    │ - Estructura HTML       │
                    │ - 2 secciones           │
                    │ - IDs únicos             │
                    └────┬──────────────────┬──┘
                         ↓                  ↓
            ┌─────────────────────┐  ┌──────────────────┐
            │  css/styles.css     │  │ js/main.js       │
            ├─────────────────────┤  ├──────────────────┤
            │ - Colores           │  │ - Variables      │
            │ - Fuentes           │  │ - Funciones      │
            │ - Espacios          │  │ - Eventos        │
            │ - Diseño responsivo │  │ - Lógica         │
            │ - display: none/bl..│  │ - sessionStorage │
            └─────────────────────┘  └────────┬─────────┘
                        ↑                     ↓
                        └─────────┬───────────┘
                                  ↓
                    ┌─────────────────────────┐
                    │   Usuario ve:           │
                    ├─────────────────────────┤
                    │ Pantalla bonita,        │
                    │ colorida, interactiva   │
                    └─────────────────────────┘
```

---

## CONCEPTOS TÉCNICOS EXPLICADOS SIMPLE

| Concepto           | ¿Qué es?               | Ejemplo                             |
| ------------------ | ---------------------- | ----------------------------------- |
| **HTML**           | Estructura (esqueleto) | Los huesos del cuerpo               |
| **CSS**            | Estilos (decoración)   | Ropa y maquillaje                   |
| **JavaScript**     | Lógica (inteligencia)  | El cerebro y los músculos           |
| **DOM**            | Árbol de elementos     | Árbol genealógico de elementos HTML |
| **Evento**         | Acción del usuario     | Clic, tecla presionada, mouse       |
| **sessionStorage** | Memoria temporal       | Post-it pegado en la mesa           |
| **Fetch**          | Descargar datos        | Ir al almacén a traer productos     |
| **JSON**           | Formato de datos       | Tabla de contenidos                 |
| **Responsive**     | Se adapta al tamaño    | Como ropa elástica                  |
| **Grid**           | Sistema de columnas    | Tablero de ajedrez                  |

---

## ¿CÓMO USARLO EN LA FERIA?

### PASO 1: Explicación Básica (2 min)

"Es un museo interactivo sobre el fracking. Se protege con una contraseña que la docente les da solo a visitantes autorizados."

### PASO 2: Demo (2 min)

1. Abrir la página
2. Escribir contraseña: **fracking2026**
3. Hacer clic en "Entrar al museo"
4. Mostrar la pantalla del museo (Etapa 3)

### PASO 3: Explicación Técnica (3 min)

1. Mostrar archivo HTML → "Esta es la estructura"
2. Mostrar archivo CSS → "Estos son los estilos"
3. Mostrar archivo JS → "Esta es la lógica"
4. Mostrar cómo funcionan juntos

### PASO 4: Preguntas (Prepárate para esto)

- **¿Por qué tiene contraseña?** → Seguridad y control de acceso
- **¿Cómo conoce la contraseña?** → La docente la comunica
- **¿Funciona sin conexión?** → Sí, todo es local
- **¿Cómo se hizo?** → Con HTML, CSS y JavaScript

---

## PRÓXIMOS PASOS (ETAPA 3)

```
1. Llenar data.json con las 6 salas
   ↓
2. Modificar main.js para cargar data.json
   ↓
3. Crear tarjetas dinámicamente
   ↓
4. Agregar interactividad (click para ver detalles)
   ↓
5. Agregar estilos para las tarjetas
```

---

## DUDAS FRECUENTES

**P: ¿Necesito internet para que funcione?**
R: No. Solo necesitas tener los archivos en tu computadora. Abre index.html y listo.

**P: ¿Puedo cambiar la contraseña?**
R: Sí, en main.js, línea 17: `const CLAVE_ACCESO = "tu-nueva-clave";`

**P: ¿Cómo agrego más salas?**
R: En data.json, agrega más objetos en el array "obras".

**P: ¿Funciona en celular?**
R: Sí, porque tiene diseño responsive. Se adapta a cualquier pantalla.

**P: ¿Puedo ponerle un logo?**
R: Sí, en HTML agrega una etiqueta `<img>` en la pantalla de acceso.

---

## ¡LISTO PARA LA FERIA!

**Punto clave a enfatizar:**

> "Este museo demuestra cómo la tecnología (HTML, CSS, JavaScript) puede hacer educación más interactiva y segura. Es un ejemplo real de desarrollo web que pueden aprender y usar."

---

**Creado para Grado 7° - Materia de Ciencias Naturales**
