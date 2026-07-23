# Estudiante de 7º grado - Proyecto académico sin remuneración
Proyecto desarrollado por un estudiante de 7° grado como ejercicio académico
formativo en el área de tecnología e informática.

- **Institución:** CASD Armenia, Quindio Sede Principal
- **Área:** Ciencias Naturales
- **Docente solicitante:** Profesora de Ciencias Naturales Sandra E. Loaiza R.
- **Año:** 2026

# Museo Interactivo de Ciencias Naturales
## ¿De qué trata?

Sitio web interactivo que funcione como museo virtual donde los estudiantes de 7º grado presentan sus investigaciónes sobre los *efectos del fracking en los ecosistemas de Colombia*

## Salas del museo

# | Sala                           | Tema                     |
1. Entrada                         | Introducción y bienvenida
2. ¿Qué es el Fracking?            | Definición y proceso
3. Beneficios                      | Argumentos a favor
4. Efectos sobre el agua           | Contaminación hídrica
5. Efectos sobre la contaminación  | Emisiones y salud
6. Efectos sobre el subsuelo       | Sismicidad y erosión

## Tecnologías
· HTML5 : Estructura de las páginas y salas
· CSS3 (Flexbox / Grid) : Diseño responsivo para celular y PC
· JavaScript (Vanilla) : Navegación entre salas y carga dinámica de contenidos
· JSON (data.json) : Registro centralizado de obras y autores
· GitHub Pages (hosting gratuito) : Despliegue gratuito con URL pública

## Ver el museo
https://srs3m.github.io/MuseoInteractivo/

## Licencia: MIT (https://mit-license.org/)

## Estructura del proyecto
.
|   data.json
|   index.html
|   README.md
|
+---assets
+---css
|       styles.css
|
\---js
        main.js

### Ciclo de desarrollo

# Antes de iniciar a trabajar, sigue estos pasos:
git fetch origin (Descarga la información del remoto sin cambiar nuestro local)
git switch develop
git status
git log develop..origin/develop --oneline (muestra los commits nuevos en el remoto)
git pull origin develop
git switch <tu_rama>  (NUNCA trabajar en otra rama)
# Cada vez que termines una tarea concreta, sigue estos tres pasos:
git add .
git commit -m "tipo: descripción clara de lo que hiciste"
git push origin <tu_rama>

### Convenciones para mensajes de commit

Cada commit debe empezar con un prefijo que indique qué tipo de cambio es:

| Prefijo | Cuándo usarlo | Ejemplo |
|---------|--------------|---------|
|`feat:`| Nueva funcionalidad | `feat: agrega sala 3 con galería de imágenes` |
|`fix:` | Corrección de un error | `fix: corrige video que no cargaba en sala 4` |
|`style:`| Cambios visuales sin lógica | `style: ajusta colores del menúprincipal` |
|`docs:` | Cambios en documentación | `docs: actualiza README con URL del museo` |
|`data:` | Cambios en data.json | `data: agrega 3 obras del grupo 2B a sala 5` |
|`refactor:`| Mejora de código |`refactor: simplifica función filtrarPorSala` |