# Sección 5 - Expandir Bases de Angular

## Introducción a la sección

En esta sección vamos a trabajar una `SPA` que tiene una lista del lado izquierdo y un pequeño formulario del lado derecho. Vamos a aprender la comunicación entre componentes (padres a hijos). También abarca el uso de servicios.

_Temas puntuales:_

1. Profundizar un poco más en los módulos
2. FormsModule
3. ngModel
4. @Inputs
5. @outputs
6. Servicios
7. Métodos en servicios
8. Depuraciones

## Continuación del proyecto

- Para seguir aprendiendo vamos a utilizar el proyecto que hemos estado trabajando en las secciones anteriores.
- Si en tu proyecto falta la carpeta `node_modules` ejecuta `npm install` para instalar las dependencias.

```bash
npm install
```

## Módulo DBZ (Dragon Ball Z)

- Vamos a crear un módulo usando el `CLI` de Angular.

```bash
ng g m dbz
```

- Automáticamente se importa el `CommonModule` en el módulo creado. Esto es para que podamos usar las directivas de Angular.
- Este módulo puede estar importado en diferentes módulos y no habría ningún problema
- Por defecto no se importa el módulo en el módulo principal

- Dentro de nuestro módulo vamos a tener diferentes carpetas que contienen los componentes, servicios, etc.

```bash
- src
  - app
    - dbz
      - components
      - interfaces
      - pages
        - main-page.component.ts
      - services
      - dbz.module.ts
```

_Tarea_

1. Crear un componente llamado `main-page` dentro de la carpeta `pages`.
2. Llamar el elemento `app-main-page` en el `app.component.html`.

## Diseño de la pantalla a trabajar

Dentro del `main-page.component.html` agregamos lo siguiente:

```html
<h1>DBZ Characters</h1>

<hr />

<div class="row">
  <div class="col">
    <h4>Character List</h4>
    <ul class="list-group">
      <li class="list-group-item">Krillin - 500</li>
      <li class="list-group-item">Goku - 10000</li>
    </ul>
  </div>
  <div class="col">
    <h4>Add Character</h4>
    <form action="" class="row">
      <input class="form-control mb-2" type="text" placeholder="Name" />
      <input class="form-control mb-2" type="text" placeholder="Power Level" />

      <button type="submit" class="btn btn-primary">Add Character</button>
    </form>
  </div>
</div>
```

## Pensando en componentes pequeños

- Cada fragmento de lo que creamos recién debemos pensarlo como un componente.

Componentes:

- `character-list`
- `form-add-character`
