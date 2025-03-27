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
- `add-character`

- La tarea va a ser crear estos componentes y agregarlos al `main-page`.

## @Input() - Recibir del padre

- `@Input`: Decorador que nos permite recibir información desde el componente padre. Este decorador se va a declarar en la propiedad que queremos recibir.

- Declaramos un array en el component `main-page`:

```typescript
public characters: Character[] = [
  { name: 'Krillin', power: 500 },
  { name: 'Goku', power: 10000 },
];
```

- En el componente `character-list` vamos a recibir la información de `characters`.

```typescript
@Input()
public characters: Character[] = [];

// o
@Input('data') characters: Character[] = [];
```

- Puedo pasarle el nombre de la propiedad que quiero recibir o no pasarle nada. Si no le paso nada, el nombre de la propiedad que quiero recibir es el mismo que el nombre de la propiedad en el componente padre.

- Para enviar la información desde el componente padre:

```html
<dbz-list [characters]="characters"></app-list>
```

## Expandiendo el \*ngFor

- Podemos obtener el indice de los elementos que estamos recorriendo en un `*ngFor`.

```html
<li *ngFor="let character of characters; let i = index" class="list-group-item">
  {{ character.name }} - {{ character.power }}
</li>
```

- Se pueden agregar validaciones también aplicando el indice declarado en el `*ngFor`.

```html
<span>Es el primero: {{ i === 0 }}</span>
<span>Es el ultimo: {{ i === characterList.length - 1 }}</span>
```

- También existen otras propiedades como `first`, `last`, `even`, `odd`.

```html
<li
  *ngFor="
      let character of characterList;
      let i = index;
      let isFirst = first;
      let isLast = last;
      let isEven = even;
      let isOdd = odd
    "
  class="list-group-item"
>
  ...
</li>
```

## ngClass - Clases basado en condiciones

- `[ngClass]`: Directiva que nos permite agregar clases a un elemento basado en condiciones.

```html
[ngClass]="{ 'ist-group-item-primary': isEven, }"
```

## FormsModule y ngModel

- `FormsModule`: Módulo que nos permite trabajar con formularios en Angular.
- `ngModel`: Directiva que nos permite enlazar un input con una propiedad de un componente.

- Creamos una propiedad de tipo `Character` en el componente `add-character`.

```typescript
public character: Character = {
  name: '',
  power: 0,
};
```

- Aplicamos `ngModel` en los inputs del formulario.
- Esto nos habilita el `two-way data binding`. Que es básicamente la comunicación entre el componente y la vista.
- Obtenemos el dato y lo podemos modificar en tiempo real.

```html
<input
  class="form-control mb-2"
  type="text"
  placeholder="Name"
  name="name"
  [(ngModel)]="character.name"
/>
<input
  class="form-control mb-2"
  type="text"
  placeholder="Power Level"
  name="power"
  [(ngModel)]="character.power"
/>
```

- Para poder ver el objeto que estamos modificando en tiempo real, agregamos el pipe `json`.

```html
<pre>
  {{ character | json }}
</pre>
```

## @Output() - Emitir eventos al padre

- Para enviar un formulario, usamos el evento `submit`.

```html
<form (ngSubmit)="addCharacter()">...</form>
```

- Para recibir el evento desde el padre es necesario `suscribirnos` al evento
- Este término nace de `RxJS`, que es básicamente programación reactiva.
- El formulario va a enviar los datos al componente padre a través de un evento

- Dentro de nuestro componente `add-character`:

```typescript
export class AddCharacterComponent {
  public onNewCharacter: EventEmitter<Character> = new EventEmitter();

  // ...

  emitCharacter(): void {
    console.log(this.character);

    if (this.character.name.trim().length === 0) return;

    this.onNewCharacter.emit({ ...this.character });

    // Limpiar el formulario
    this.character.name = "";
    this.character.power = 0;
  }
}
```

- Dentro de nuestro componente `main-page.component.html` y `main-page.component.ts`:

```html
<dbz-add-character
  (onNewCharacter)="onNewCharacter($event)"
></dbz-add-character>
```

```typescript
export class MainPageComponent {
  // ...

  onNewCharacter(character: Character): void {
    console.log("MainPageComponent.onNewCharacter", character);
  }
}
```

- El `$event` es el objeto que estamos emitiendo desde el componente hijo.

## Formas de depurar la app

- `console.log`: Sirve para imprimir en consola cualquier tipo de dato.
- `Angular DevTools`: Extensión de Chrome que nos permite depurar nuestra aplicación Angular.
- `debugger`: Nos permite detener la ejecución de nuestro código en un punto específico.
- `breakpoints`: Puntos de interrupción que nos permiten detener la ejecución de nuestro código en un punto específico. Esto se puede hacer desde la pestaña `Sources` del navegador.

## Añadir personaje al listado

- Para añadir un personaje al listado, vamos a recibir el evento en el componente `main-page`.

```typescript
onNewCharacter(character: Character): void {
  this.characters.push(character);
}
```

- También podríamos agregar un botón para eliminar un personaje.

## Servicios

- Es importante empezar a pensar en algún lugar donde podamos almacenar la información de los datos que estamos manejando.
- Dentro de nuestro componente, no es bueno que tengamos la lógica de manejo de datos.
- Los servicios en Angular son del tipo `singleton`, es decir, solo se crea una instancia de este servicio y se comparte en toda la aplicación.
- Para crear el servicio podemos usar el `CLI`, o también hacerlo manualmente.

```bash
ng g s dbz/dbz
```

- Usando los snippets de Angular se crea lo siguiente

```typescript
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class DbzService {
  constructor() {}
}
```

- `provideIn`: Especifica que el servicio se va a inyectar en el `root` de la aplicación. Va a realizar un `singleton` en toda la aplicación.

- Para poder usarlo en nuestro componente debo inyectarlo en el constructor.

```typescript
constructor(private dbzService: DbzService) {}
```

## Paquetes externos - UUID

- Usar el indice para eliminar un elemento, no es una buena práctica.
- Para solucionar esto vamos a instalar un paquete llamado `uuid`.

```bash
pnpm install uuid
```

## Servicio privado

- Cuando inyectamos un servicio privado, no vamos a poder acceder al servicio desde el template.
- Es necesario crear los métodos y getters para poder acceder a la información.
