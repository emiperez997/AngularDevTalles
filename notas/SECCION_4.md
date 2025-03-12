# Sección 4 - Angular

## Introducción a la sección

Temario de esta sección:

- Archivos importantes
- Componentes -> `.ts`
- Servicios
- Módulos
- Clases
- Decoradores
- Directivas (ngIf, ngFor)
- Test -> `.spec`

## Exposición sobre Angular

### ¿Qué es Angular?

- Ees un Framework estandarizado
- Viene con todo lo que necesitas para trabajar
- Es modular
- Google es quien le da mantenimiento

### Bloques fundamentales

- Componentes

  - HTML: Vista
  - Clase TypeScript: Lógica
  - Estilos: CSS

- Servicios

  - Lugar centralizado de información

- Directivas

  - Directivas de componentes
    - Contiene un pedazo de código HTML reutilizable
  - Directivas estructurales
    - Modifica el DOM o el HTML
  - Directivas de atributos
    - Cambian la apariencia o el comportamiento de un elemento

- Rutas

  - Mostrar diferentes componentes basados en la URL

- Módulos

  - Agrupar componentes, servicios, directivas, etc.

## Nota de actualización

Desde Angular v17, por defecto los proyectos trabajan sin módulos (module-less)

Pero para trabajar de forma tradicional, como lo vieron en el curso:

```bash
ng new <nombre de la aplicación> --standalone false
```

Es todo, sigamos con el curso.

## Nuestro primer proyecto en Angular

- Para poder crear un proyecto en Angular, necesitamos tener instalado Node.js y Angular CLI. Para instalar Angular CLI, ejecutamos el siguiente comando:

```bash
npm install -g @angular/cli
```

- Para crear un proyecto en Angular, ejecutamos el siguiente comando:

```bash
ng new <nombre del proyecto> --no-standalone --package-manager pnpm

✔ Which stylesheet format would you like to use? CSS
✔ Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? No
```

- Para poder correr el proyecto, ejecutamos el siguiente comando:

```bash
cd <nombre del proyecto>
ng serve
# o
ng s
```

_Notas de Angular 17_

En Angular 17 en adelante trabajan sin módulos. Durante este curso trabajaremos con módulos. Hay otro curso de DevTalles donde enseñan a trabajar sin módulos, con standalone components.

## Explicación de cada archivo del proyecto

- `.editorconfig`: Archivo de configuración para el editor de código.
- `.gitignore`: Archivo que contiene los archivos que no queremos que se suban al repositorio.
- `angular.json`: Archivo de configuración de Angular. Generalmente no se modifica, a menos que sea necesario.
- `package-lock.json`: Archivo que contiene la información de las dependencias del proyecto.
- `package.json`: Archivo que contiene la información del proyecto y las dependencias.
- `README.md`: Archivo que contiene la información del proyecto.
- `tsconfig.json`: Archivo de configuración de TypeScript.
- `tsconfig.app.json`: Archivo de configuración de TypeScript para la aplicación.
- `tsconfig.spec.json`: Archivo de configuración de TypeScript para las pruebas.

## Explicación de cada archivo del proyecto - Parte 2

- `.angular`: Ayuda a angular a detectar cuando se ha modificado un archivo.
- `.vscode`: Contiene la configuración de Visual Studio Code (extensiones, configuración, etc.).
- `node_modules`: Contiene las dependencias del proyecto.
- `public`: Contiene los archivos estáticos de la aplicación.
- `src`: Contiene el código fuente de la aplicación.
  - `app`: Contiene los componentes, servicios, módulos, etc. de la aplicación.
    - `app-routing.module.ts`: Archivo de configuración de las rutas de la aplicación.
    - `app.component.css`: Archivo de estilos del componente.
    - `app.component.html`: Archivo de vista del componente.
    - `app.component.ts`: Archivo de lógica del componente.
    - `app.component.spec.ts`: Archivo de pruebas del componente.
    - `app.module.ts`: Módulo principal de la aplicación.
  - `index.html`: Archivo principal de la aplicación.
  - `main.ts`: Punto de entrada de la aplicación.
  - `styles.css`: Archivo de estilos globales de la aplicación.

## App Component

- En esta clase vamos a trabajar en el archivo `app.component.html`.
- Todo código `html` que escirbamos en este archivo, se va a mostrar en la página principal de la aplicación.

- Quitando el decorador `@Component`, el `AppComponent` es sólo una clase con propiedades y métodos
- El decorador `@Component` es el que le da vida al componente
- Podemos definir propiedades a nuestro componente como si fuera una clase cualquiera:

```typescript
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  standalone: false,
  styleUrl: "./app.component.css",
})
export class AppComponent {
  public title: string = "Mi Primera App en Angular";
}
```

- Para poder usar esta propiedad en el archivo `app.component.html`, usamos la interpolación:

```html
<h1>{{ title }}</h1>
```

> [!NOTE]
> Es importante tener instalado Angular DevTools en nuestro navegador para poder trabajar de una manera más cómoda
