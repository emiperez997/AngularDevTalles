// Usualmente el primer genérico se llama T, el segundo U, el tercero V, etc.
export function whatsMyType<T>(argument: T): T {
  return argument;
}

// A la hora de llamar a la función se le debe pasar el tipo de dato que se espera
// const amIString = whatsMyType("Hello"); // El tipo inferido es "Hello" y no un String

// Cuándo definimos el tipo, ese tipo definido tiene prioridad por sobre el argumento
const amIString = whatsMyType<string>("Hello"); // El tipo inferido es un String

console.log({ amIString });
