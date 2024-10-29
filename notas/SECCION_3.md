# Sección 3 - Bases de TypeScript (Recomendado)

## Iniciar proyecto

- Creamos un proyecto con `vite`.

```bash
npm create vite .
```

- Le indicamos que vamos a trabajar con `vanilla`.

```bash
? Select a framework: vanilla
? Select a variant: TypeScript
```

- Luego instalamos los paquetes con `npm install`.

> ![NOTE]
> En nuestro caso vamos a utilizar pnpm ya que funciona más rápido

## Tipos básicos

En TypeScript el tipo de dato es _inferido_, lo que quiere decir que se le asigna el tipo cuando le asignamos el valor.

```ts
let name = "Strider";

name = 123; // ❌ Error: Type 'number' is not assignable to type 'string'

name = "123"; // ✅ OK
```

Utilizando el operador `|` podemos indicarle más de un tipo de dato. Incluso, podríamos indicar que sólo va a recibir la palabra `FULL`.

```ts
// Primer ejemplo
let hpPoints: number | string = 95;

hpPoints = "Hola mundo"; // ✅ OK

// Segunda ejemplo
let hpPoints: number | "FULL" = 95;

hpPoints = "FULL"; // ✅ OK
```

Para poder verificar este código, debemos importar nuestro módulo en nuestro archivo main.

```ts
import "./topics/01-basic-types.ts";
```

TypeScript entiende que nuestro archivo es un módulo cuando utilizamos la siguiente sentencia:

```ts
export {};
```

## Objetos, arreglos e interfaces

Podemos declarar un arreglo con el tipo de la siguiente forma:

```ts
const skills: string[] = ["Bash", "Counter", "Healing"];
```

> ![TIP]
> Es buena práctica que utilicemos `const` para los arrays en vez de `let` ya que es más liviano.

Podemos definir el tipo o las propiedades de forma estática creando una `interfaz` e implementándola en el objeto:

```ts
interface Character {
    name: string,
    hp: number;
    skills: string[];
    hometown?: string; // Propiedad opcional
}

const strider: Character = {
    name: 'Strider',
    hp: 100,
    skills: ['Bash', 'Counter'],
    hometown: 'Rivendell'
}
```