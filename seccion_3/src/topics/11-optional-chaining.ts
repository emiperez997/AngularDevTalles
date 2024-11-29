export interface Passenger {
  name: string;
  children?: string[];
}

const passenger1: Passenger = {
  name: "Juan Perez",
};

const passenger2: Passenger = {
  name: "Luisa Perez",
  children: ["Luis Perez", "Laura Perez"],
};

// const printChildern = (passenger: Passenger) => {
//   // El optional chaining es indiciar con el signo de interrogación "?" que el valor puede ser undefined o null
//   // Con el operador "||" le indicamos que si el valor es undefined o null, se le asignará el valor 0
//   const howManyChildren = passenger.children?.length || 0;

//   console.log(passenger.name, howManyChildren);
// };

const returnChildrenNumber = (passenger: Passenger): number => {
  if (!passenger.children) return 0;

  // Con el "!" le indicamos a TypeScript que estamos seguros que el valor no es null o undefined
  // "!" -> Non-null assertion operator
  const howManyChildren = passenger.children!.length;

  return howManyChildren;
};

returnChildrenNumber(passenger1);
returnChildrenNumber(passenger2);
