
/**
 * Returns the provided argument and logs its runtime type to the console.
 *
 * @typeParam T - Tipo genérico que representa el tipo del argumento.
 * @param argument - El valor de cualquier tipo que será retornado por la función.
 * @returns El mismo valor que se pasó como argumento.
 *
 * @remarks
 * Los genéricos en TypeScript permiten que las funciones, clases o interfaces trabajen con diferentes tipos de datos sin perder la información de tipo.
 * Esto proporciona flexibilidad y reutilización de código, asegurando al mismo tiempo la seguridad de tipos.
 */
export function whatsMyType<T>(argument: T): T {
  // This function takes an argument of type T and returns it.
  // The type T is a generic type, meaning it can be any type.
  // This allows the function to be flexible and work with different types of arguments.
  console.log(`The type of the argument is: ${typeof argument}`);
  // The typeof operator is used to determine the type of the argument at runtime.
  // It logs the type of the argument to the console.
  return argument;
}

const amIString = whatsMyType<string>("Hello TypeScript");
const amINumber = whatsMyType<number>(42);
const amIArray = whatsMyType<number[]>([1, 2, 3]);

console.log(amIString.split(" "));
console.log(amINumber.toFixed());
console.log(amIArray.join("-"));
