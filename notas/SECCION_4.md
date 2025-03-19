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

## Contador

- Vamos a añadir dos botones a nuestro `html`

```html
<button>+</button>

<button>-</button>
```

- Para que estos botones funcionen, es necesario crear un método en nuestro componente

```typescript
increaseBy(value: number): void {
  this.counter += 1;
}
```

- Debemos agregar a nuestro botón el evento `click` y llamar al método que acabamos de crear

```html
<button (click)="increaseBy(+1)">+1</button>
<button (click)="increaseBy(-1)">-1</button>
```

- Cualquier cambio que surga en la propiedad de `counter` se verá reflejado en la vista

## Contador Component

- Creamos un archivo `counter.component.ts` dentro de una carpeta llamada `counter`

```bash
- src
  - app
    - counter
      - counter.component.ts
```

- Dentro del archivo, creamos una clase que la vamos a convertir en un componente

```typescript
import { Component } from "@angular/core";

@Component({
  selector: "app-counter",
  standalone: false,
  template: ``,
})
export class CounterComponent {}
```

- El template se puede crear en un archivo `html` aparte, o podemos crear el template directamente en el archivo `ts`, en una sola linea
- El selector es el que vamos a utilizar para llamarlo en otras plantillas
- Nuestro componente necesita estar declarado dentro de un módulo. Puede tener un módulo propio o utilizarlo como `standalone component`
- En nuestro caso vamos a definir nuestro componente en el módulo principal

```typescript
@Component({
  ...
  declarations: [CounterComponent],
  ...
})
```

> [!NOTE]
> Hoy en día, por defecto los componentes son del tipo standalone, por lo que hay que agregar la propiedad `standalone: false` para que funcione de la manera tradicional

## Funcionalidad

- Si un componente tiene más de 4 lineas, es recomendable usar un template externo (consejo de Fernando Herrera)

- Nuestro componente `counter` quedaría asi:

```typescript
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-counter",
  template: `
    <h3>
      {{ counter }}
    </h3>

    <button (click)="increaseBy(+1)">+1</button>
    <button (click)="reset()">Reset</button>
    <button (click)="increaseBy(-1)">-1</button>
  `,
  standalone: false,
})
export class CounterComponent {
  public counter: number = 10;

  increaseBy(value: number): void {
    this.counter += value;
  }

  reset(): void {
    this.counter = 10;
  }
}
```

## Componente Hero y directorios

- Hay varias formas de organizar los componentes en Angular
- Por ahora vamos a utilizar la forma más sencilla. Es decir, por cada parte de nuestra app, vamos a crear una carpeta con los componentes que pertenecen a esa parte
- Vamos a crear un componente `hero` y `list` dentro de una carpeta `heroes`

```bash
- src
  - app
    - heroes
      - hero
        - hero.component.ts
      - list
        - list.component.ts
```

- Para lograr esto vamos a usar el `CLI` de Angular

```bash
ng generate component heroes/hero
ng generate component heroes/list
```

- Al componente `hero` vamos a cambiar el nombre del selector

```typescript
@Component({
  selector: "app-heroes-hero",
  standalone: false,
  templateUrl: "./hero.component.html",
  styleUrl: "./hero.component.css",
})
export class HeroComponent {}
```

- Cuando creamo el componente con el `CLI`, se agregan al primer módulo que encuentren. En este caso, es el módulo principal
- Una vez que el componente esté importado en el módulo, ya podemos utilizarlo en la vista

```html
<app-heroes-hero></app-heroes-hero>
```

## Interpolación, estructura HTML y estilos

- Vamos a instalar bootstrap en nuestro proyecto
- Para esto, vamos a agregar el `cdn` de bootstrap en el archivo `index.html`
- Dentro del `hero.component.html` vamos a agregar lo siguiente

```html
<h1>{{ name }}</h1>

<dl>
  <td>Nombre:</td>
  <dd>{{ name }}</dd>

  <td>Edad:</td>
  <dd>{{ age }}</dd>

  <td>Método:</td>
  <dd>algún metodo</dd>

  <td>Capitalizdo:</td>
  <dd>nombre capitalizado</dd>
</dl>

<div class="d-flex gap-2">
  <button class="btn btn-primary">Cambiar nombre</button>
  <button class="btn btn-primary">Cambiar edad</button>
</div>
```

- Dentro del `hero.component.ts` vamos a agregar lo siguiente

```typescript
@Componente({
  ...
})
export class HeroComponent {
  public name: string = 'Captain America';
  public age: number = 35;
}
```

- También vamos a agregar estilos personalizados en el archivo `hero.component.css`

```css
h1 {
  font-size: 50px;
}

td {
  font-size: 1.5rem;
}

dd {
  font-size: 1rem;
  font-weight: bold;
}
```

## One Way Data Binding - Enlazado en una sola vía

- La idea es tener un enlazado donde un dato dentro del `html` se actualice cuando cambie en el `ts`
- En lo posible, evitar el `Two Way Data Binding` ya que puede traer problemas de rendimiento
- Vamos a crear un método `getter` para capitalizar el nombre

```typescript
get capitalizedName(): string {
  return this.name.toUpperCase();
}
```

- A la hora de llamar este método, lo podemos invocar cómo si fuera una propieadad. Esto por usar la palabra `get`

```html
<td>Capitalizado:</td>
<dd>{{ capitalizedName }}</dd>
```

- Nuestras clases tienen el total control de la vista, por lo que podemos hacer cualquier tipo de transformación de datos
- También podemos agregar métodos:

```typescript
getHeroDescription(): string {
  return `${this.name} tiene ${this.age} años`;
}
```

- Y llamarlo en la vista

```html
<td>Método:</td>
<dd>{{ getHeroDescription() }}</dd>
```

- Si declaro cualquier propiedad o método como `private`, no puedo acceder a él desde la vista. Esto porque se considera a la vista como un componente separado

## Tarea - Cambiar nombre y edad

- La tarea es crear dos métodos en el componente `hero` que permitan cambiar el nombre y la edad. Que, cuando apretemos el botón, cambie el dato en la vista

> [!NOTE]
> Cuando creamos un método que no está implementado generalmente se utiliza el `throw new Error('Not implemented yet')` o un comentario que diga `// TODO: Implementar`

**Solución**

```typescript
changeName(): void {
  this.name = 'ironman';
}

changeAge(): void {
  this.age = 45;
}
```

```html
<button (click)="changeName()" class="btn btn-primary">Cambiar nombre</button>
<button (click)="changeAge()" class="btn btn-primary">Cambiar edad</button>
```

## Directiva \*ngIf

- La directiva `*ngIf` nos permite mostrar u ocultar un elemento en base a una condición

```html
<button
  *ngIf="name !== 'ironman'"
  (click)="changeName()"
  class="btn btn-primary"
>
  Cambiar nombre
</button>
```

- El `*ngIf` es parte de la detección de cambios de Angular. Si la condición es `false`, Angular _elimina_ el elemento del DOM

## Directiva \*ngFor

- En esta sección nos vamos a enfocar en el componente de `list`
- Vamos a crear un array de héroes en el componente `list`

```typescript
export class ListComponent {
  public heroNames: string[] = [
    "Spiderman",
    "Ironman",
    "Hulk",
    "Captain America",
  ];
}
```

- Dentro del `list.component.html` vamos a agregar lo siguiente

```html
<ul>
  <li *ngFor="let name of heroNames">{{ name }}</li>
</ul>
```

- Dentro del for, podemos acceder a la variable `name` que es la que estamos iterando

## ng-Template y el ngIf-else

- `ngif-else`: Nos permite mostrar un bloque de código si la condición es `false`

- Vamos a agregar un botón que nos permita eliminar el último héroe y también un mensaje que indique que no borro nada

```html
<h3>Heroe borrado <small class="text-danger"> heroe </small></h3>
<h3>No ha borrado nada</h3>

<button class="btn btn-outline-danger">Borrar último heroe</button>
```

- También vamos a agregar un método que nos permita eliminar el último héroe

```typescript
removeLastHero(): void {
  this.heroNames.pop();
}
```

- `ng-template`: Es como un `div` que no existe. No se renderiza en el DOM, pero podemos utilizarlo para mostrar un bloque de código
- Con esta directiva podemos definir cuando y qué elementos se van a mostrar

```html
<ng-template>
  <h3>No ha borrado nada</h3>
</ng-template>
```

- Debemos agregar al `ng-if` la directiva `else` para que sepa que bloque de código mostrar, seguido del nombre del `ng-template` al cual hace referencia

```html
<div
  *ngIf="deletedHero; else nothingDeleted"
  class="text-center alert alert-danger"
>
  <h3>Heroe borrado <small class="text-danger"> {{ deletedHero }} </small></h3>
</div>

<ng-template #nothingDeleted>
  <h3>No ha borrado nada</h3>
</ng-template>
```

## Módulos en Angular

- Los módulos en Angular nos permiten agrupar componentes, servicios, directivas, etc.
- Hasta ahora tenemos tres componentes: `counter`, `hero` y `list`

- Vamos a tener la siguiente estructura de carpetas dentro de la entidad counter. Dentro de la carpeta `components` de counter, vamos a tener un módulo que agrupa todos los componentes relacionados con el contador

```bash
- src
  - app
    - counter
      # Scope del módulo
      - components
        - counter
          - counter.component.ts
        - counter.module.ts
```

- Ahora dentro del archivo `counter.module.ts` vamos a importar los componentes que pertenecen a este módulo

```typescript
import { NgModule } from "@angular/core";
import { CounterComponent } from "./counter/counter.component";

@NgModule({
  // Declaro los componentes que pertenecen a este módulo
  declarations: [CounterComponent],
  // Exporto los componentes que quiero que sean utilizados fuera de este módulo
  exports: [CounterComponent],
})
export class CounterModule {}
```

- El módulo debemos importarlo en la sección de `imports` del módulo principal (o del módulo que lo vaya a utilizar)

```typescript
@NgModule({
  ...
  imports: [BrowserModule, AppRoutingModule, CounterModule],
  ...
})
export class AppModule {}
```

## Tarea - Crear módulo para héroes

- Necesitamos crear un módulo al nivel de la carpeta `heroes` que agrupe los componentes `hero` y `list`

**Solución**

- Creamos el archivo `heroes.module.ts` dentro de la carpeta `heroes`

```typescript
import { NgModule } from "@angular/core";
import { HeroComponent } from "./hero/hero.component";
import { ListComponent } from "./list/list.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [HeroComponent, ListComponent],
  exports: [HeroComponent, ListComponent],
  imports: [CommonModule], // Es necesario para que las directivas de Angular funcionen correctamente
})
export class HeroModule {}
```

- Importamos el módulo en el módulo principal

```typescript
@NgModule({
  ...
  imports: [BrowserModule, AppRoutingModule, CounterModule, HeroModule],
  ...
})
export class AppModule {}
```
