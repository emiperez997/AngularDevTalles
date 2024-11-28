// Funciones Básicas
// Función tradicional
function addNumbers(a: number, b: number) {
  return a + b;
}

// Función flecha
const addNumbersArrow = (a: number, b: number): string => {
  return `${a + b}`;
};

function multiply(
  firstNumber: number,
  secondNumber?: number,
  base: number = 2
) {
  return firstNumber * base;
}

// const result: number = addNumbers(1, 2);
// const result2: string = addnumbersarrow(1, 2);
// const multiplyresult: number = multiply(5);

// console.log({ result, result2, multiplyResult });

// Funciones con objetos como argumentos

interface Character {
  name: string;
  hp: number;
  showHp: () => void; // Para definir una función debemos poner el tipo que devuelve
}

const healCharacter = (character: Character, amount: number) => {
  character.hp += amount;
};

const strider = {
  name: "Strider",
  hp: 50,
  showHp() {
    console.log(`Puntos de vida ${this.hp}`);
  },
};

healCharacter(strider, 10);

strider.showHp();

export {};
