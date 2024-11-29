// T extends { new (...args: any[]): {} } -> T es una clase que recibe cualquier cantidad de argumentos y retorna un objeto
function classDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    newProperty = "new property";
    hello = "override";
  };
}

@classDecorator
export class SuperClass {
  public myProperty: string = "ABC123";

  print() {
    console.log("Hello World");
  }
}

console.log(SuperClass);

const myClass = new SuperClass();

console.log(myClass);
