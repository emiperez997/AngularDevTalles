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
  name: string;
  hp: number;
  skills: string[];
  hometown?: string; // Propiedad opcional
}

const strider: Character = {
  name: "Strider",
  hp: 100,
  skills: ["Bash", "Counter"],
  hometown: "Rivendell",
};
```

## Funciones básicas

```ts
// Función tradicional
function addNumbers(a: number, b: number) {
  return a + b;
}

// Función flecha
const addNumbersArrow = (a: number, b: number): string => {
  return `${a + b}`;
};
```

- Al no declarar el tipo de retorno, el tipo de retorno es `void`
- Cuando pasamos variables, es necesario declarar el tipo, porque sino lo toma como un tipo `any`

```ts
function addNumbers(a, b) {} // ❌ Error
```

```ts
function addNumbers(a: number, b: number) {} // ✅ OK
```

> [!NOTE]
> Esto es porque `tsconfig.json` está en modo estricto

- Estos parámetros son de tipo `number` y son obligatorios

```ts
function addNumbers(a: number, b: number) {
  return a + b;
}
```

- Podemos almacenar el resultado en una variable e imprimirlo

```ts
const result: number = addNumbers(1, 2);

console.log({ result });
```

- Funcion con parametro opcional y con valor por defecto

```ts
function multiply(
  firstNumber: number,
  secondNumber?: number,
  base: number = 2
) {
  return firstNumber * base;
}
```

## Funciones con objetos como argumentos

- Para pasar un objeto como parámetro es necesario tiparlo utilizando una interfaz

```ts
interface Character {
  name: string;
  hp: number;
  showHp: () => void; // Para definir una función debemos poner el tipo que devuelve
}

const healCharacter = (character: Character, amount: number) => {
  character.hp += amount;
};

const strider: Character = {
  name: "Strider",
  hp: 50,
  showHp() {
    console.log(`Puntos de vida ${this.hp}`);
  },
};

healCharacter(strider, 10);

strider.showHp();
```

## Tarea sobre objetos e interfaces

- Cuando tenemos un objeto dentro de una interfaz, es buena práctica definir una interfaz para ese objeto

```ts
// ❌
interface SuperHero {
  name: string;
  age: number;
  address: {
    calle: string;
    pais: string;
    ciudad: string;
  };
  showAddress: () => string;
}

// ✅
interface SuperHero {
  name: string;
  age: number;
  address: Address;
  showAddress: () => string;
}

interface Address {
  street: string;
  country: string;
  city: string;
}
```

> [!NOTE]
> Con `f2` sobre una propiedad, podemos cambiar el nombre también en donde se esté utilizando esa propiedad

## Desestructuración de Objetos

- Consiste en tomar las propiedades que necesitemos de un objeto

```ts
const { song } = audioPlayer;

console.log({ song });
```

- Puedo asignarle un nombre aleatorio a la propiedad de la siguiente forma

```ts
const song = "New Song";

const { song: anotherSong, songDuration, details } = audioPlayer;
```

- También puedo desestructurar un objeto dentro de otro de la siguiente manera

```ts
const {
  song: anotherSong,
  songDuration,
  details: { author },
} = audioPlayer;
```

- Aunque no es la mejor forma en cuestión de legibilidad, podemos utilizar la siguiente forma

```ts
const { song: anotherSong, songDuration, details } = audioPlayer;

const { author } = details;
```

## Desestructuración de Arreglos

- Puedo utilizar los corchetes para obtener el o los datos que quiero de un array
- Puedo indicarle un valor por defecto en caso de que no lo encuentre
- Sino necesito los demás datos, puedo reemplazarlo por comas, sin asignarle nombres

```ts
const [, , trunks = "Not found"]: string[] = ["Goku", "Vegeta", "Trunk"];
```

## Desestructuración de argumentos

> [!NOTE]
> Si una función recibe más de 2 o 3 argumentos, es necesario agruparlo en un grupo y tiparlo, como mejor práctica

```ts
interface TaxCalculationOptions {
  tax: number;
  products: Product[];
}

function taxCalculation(options: TaxCalculationOptions): number[] {
  let total = 0;

  options.products.forEach((prod) => {
    total += prod.price;
  });

  return [total, total * options.tax];
}
```

## Resolución de Tarea - Desestructuración

- `Ejercicio`: Aplicar Desestructuración lo más que podamos
- `[number, number]`: Le indicamos que devuelve un array con sólo dos números

```ts
function taxCalculation(options: TaxCalculationOptions): [number, number] {
  let total = 0;

  const { tax, products } = options;

  products.forEach(({ price }) => {
    total += price;
  });

  return [total, total * tax];
}

const shoppingCart = [phone, tablet];
const tax = 0.15; // Impuesto sobre la venta

const [total, taxTotal] = taxCalculation({
  products: shoppingCart,
  tax,
});

console.log("Total", total);
console.log("Total con impuesto", taxTotal);
```

## Importaciones y exportaciones

- Hasta el momento utilizamos el `export {}` para que ese archivo sea considerado un módulo
- `Mundo exterior`: Cualquier otro archivo que sea externo al módulo
- Exportar hace referencia a exponer un fragmento de código al resto de los módulos

```ts
import { Product, taxCalculation } from "./06-fuction-destructuring";

const shoppipngCart: Product[] = [
  {
    description: "Nokia",
    price: 100,
  },
  {
    description: "iPad",
    price: 150,
  },
];

const [total, tax] = taxCalculation({
  products: shoppipngCart,
  tax: 0.15,
});

console.log("Total", total);
console.log("Tax", tax);
```

- A la hora de importar código en otro archivo, es necesario que no se ejecuten ninguna acción para evitar uso de procesos innecesarios

## Clases básicas

```ts
// Molde para crear instancias / objetos
export class Person {
  public name: string;
  private address: string; // Por más que sea privado, se puede invocar, pero nos va a marcar error

  constructor() {
    this.name = "Emiliano";
    this.address = "New York";
  }
}

const ironman = new Person();

console.log(ironman);
```

## Constructor de una clase

- Es un método que se va a llamar cuando se crea una instancia de una clase

- También se puede simplificar el constructor de la siguiente manera:

```ts
export class Person {
  // Similar a inyección de dependencias
  // La ID se inyecta en el constructor y setea la instancia de una clase
  constructor(public name: string, private address: string = "No Address") {}
}

const ironman = new Person("Tony Stark", "New York");

console.log(ironman);
```

## Extender una clase

```ts
// Podemos extender funcionalidades/propiedades de otra clase
export class Person {
  constructor(public name: string, private address: string = "No Address") {}
}

export class Hero extends Person {
  constructor(
    public alterEgo: string,
    public age: number,
    public realName: string
  ) {
    super(realName, "New York"); // Llama al constructor de la clase Padre
  }
}
const ironman = new Hero("Ironman", 45, "Tony");

console.log(ironman);
```

## Priorizar composición sobre herencia

- En vez de utilizar herencia, podriamos aplicar este tipo de composición
- De esta forma, nosotros podríamos modificar la clase `Person` sin afectar la clase `Hero`

```ts
export class Person {
  constructor(
    public firstName: string,
    public lastName: string,
    private address: string = "No Address"
  ) {}
}

export class Hero {
  constructor(
    public alterEgo: string,
    public age: number,
    public realName: string,
    public person: Person
  ) {}
}

const tony = new Person("Tony", "Stark", "New York");
const ironman = new Hero("Ironman", 45, "Tony", tony);
```
