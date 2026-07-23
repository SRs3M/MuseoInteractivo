# Guía paso a paso para insertar y conectar recursos

Este documento explica cómo agregar un nuevo elemento en el museo usando siempre el mismo orden:

1. `index.html` → crear la estructura
2. `css/styles.css` → darle estilo y forma
3. `js/main.js` → conectarlo y hacerlo funcionar

---

## 1. Cómo agregar una nueva sección en `index.html`

Cada elemento nuevo comienza en `index.html`.

- Si es un bloque visible, usa un `section`, `div`, `header`, `main`, etc.
- Si JavaScript necesita manipularlo, dale un `id` único.
- Si CSS necesita que tenga un estilo común, dale una `class`.

### Ejemplo: agregar un bloque de información adicional

```html
<section id="sala-informativa" class="sala-card">
  <h2>¿Qué es el fracking?</h2>
  <p>
    El fracking es una técnica para extraer gas y petróleo rompiendo la roca con
    agua y químicos.
  </p>
</section>
```

### Qué hacer primero

- Decide qué contenido quieres mostrar.
- Escribe la estructura en HTML.
- Define `id` si lo manipulará JavaScript.
- Define `class` si tendrá estilo propio en CSS.

---

## 2. Cómo diseñar ese elemento en `css/styles.css`

Después de crear el elemento en HTML, le das su apariencia en CSS.

- Usa `#id` para estilos únicos y específicos.
- Usa `.class` para estilos que pueden repetirse.
- Ajusta colores, tamaño, espacio, fondo y bordes.

### Ejemplo: estilo para la nueva sala informativa

```css
.sala-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

#sala-informativa {
  border: 1px solid #dddddd;
}
```

### Qué hacer después

- Abre `css/styles.css`.
- Agrega reglas nuevas para las clases o ids que creaste.
- Prueba el cambio en el navegador.
- Ajusta colores y espacios hasta que se vea bien.

---

## 3. Cómo conectar el elemento en `js/main.js`

Por último, si el elemento requiere acción o interactividad, lo conectas con JavaScript.

### Cuando necesitas manipular el elemento

En `js/main.js`, haz esto:

1. Busca el elemento con `document.getElementById("mi-id")`.
2. Guarda la referencia en una variable.
3. Escribe una función para cambiarlo o usarlo.
4. Conecta un evento con `addEventListener(...)` si es necesario.

### Ejemplo: mostrar un mensaje al hacer clic

```js
const salaInformativa = document.getElementById("sala-informativa");

salaInformativa.addEventListener("click", function () {
  alert("Esta sala explica qué es el fracking.");
});
```

### Ejemplo: aparecer solo después del acceso

```js
function mostrarSalaInformativa() {
  salaInformativa.style.display = "block";
}

// dentro de verificarAcceso() o verificarSesion():
mostrarSalaInformativa();
```

### Qué hacer en JavaScript

- Busca siempre el elemento con `getElementById`.
- Modifica su estilo con `elemento.style.display` o `elemento.classList`.
- Añade eventos si el usuario debe interactuar.
- Si el elemento depende de la contraseña, muéstralo después de verificar el acceso.

---

## 4. Patrón general para crear recursos nuevos

Cada recurso nuevo sigue estos pasos:

1. `index.html` → define el elemento.
2. `css/styles.css` → dale la forma y el estilo.
3. `js/main.js` → conéctalo con lógica o eventos.

### Ejemplo completo: agregar una tarjeta de sala

#### Paso 1: HTML

```html
<div class="sala-card" id="sala-ecosistemas">
  <h3>Sala 1: Ecosistemas</h3>
  <p>Descripción breve de cómo funciona un ecosistema.</p>
</div>
```

#### Paso 2: CSS

```css
#sala-ecosistemas {
  background: #f7fbff;
  border: 1px solid #c5daf2;
}
```

#### Paso 3: JavaScript

```js
const salaEcosistemas = document.getElementById("sala-ecosistemas");

salaEcosistemas.addEventListener("mouseover", function () {
  salaEcosistemas.style.transform = "scale(1.02)";
});
```

---

## 5. Cómo agregar contenido dinámico con `data.json`

Esta parte será útil cuando quieras que las salas se creen automáticamente desde datos.

### Qué debes hacer primero

1. En `data.json`, escribe un arreglo con las salas.
2. En `index.html`, deja solo el contenedor vacío: `<section id="salas-grid"></section>`.
3. En `css/styles.css`, asegúrate de que `.salas-grid` tenga `display: grid`.
4. En `js/main.js`, usa `fetch("data.json")` para cargar los datos.

### Ejemplo de flujo en JavaScript

```js
fetch("data.json")
  .then((response) => response.json())
  .then((datos) => {
    datos.obras.forEach((obra) => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "sala-card";
      tarjeta.innerHTML = `
        <h3>${obra.sala}</h3>
        <p>${obra.descripcion}</p>
      `;
      salasGrid.appendChild(tarjeta);
    });
  });
```

---

## 6. Qué debes revisar después de cada cambio

Después de cada elemento nuevo, revisa:

- ¿Se ve en la página? (HTML)
- ¿Se aplica el estilo correcto? (CSS)
- ¿Funciona la interacción? (JS)

Y siempre usa el mismo orden:

1. HTML primero.
2. CSS segundo.
3. JS tercero.

---

## 7. Consejos finales

- Si JavaScript no encuentra un elemento, revisa que el `id` exista en `index.html`.
- Si el estilo no cambia, revisa que la `class` o `id` coincida exactamente.
- Si algo no funciona, abre la consola del navegador y busca errores.

Con esta guía, puedes crear cada recurso paso a paso y aprender cómo están conectadas las tres capas.
