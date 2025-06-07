/**
 * Diferencias entre const, let y var:
 * 
 * - const: Se usa para declarar constantes, es decir, variables cuyo valor no puede cambiar. Tiene alcance de bloque (solo existe dentro de las llaves donde se declara).
 * - let: Se usa para declarar variables que pueden cambiar de valor. También tiene alcance de bloque.
 * - var: Permite declarar variables que pueden cambiar de valor, pero su alcance es de función (existe en toda la función donde se declara, no solo en el bloque).
 *        Esto puede causar errores inesperados.
 * 
 * Ejemplos:
 * 
 * {
 *   const a = 1;
 *   let b = 2;
 *   var c = 3;
 * }
 * // console.log(a); // Error: a no está definida fuera del bloque
 * // console.log(b); // Error: b no está definida fuera del bloque
 * console.log(c); // Imprime 3, porque var tiene alcance de función/global
 */
const name: String = 'John Doe';

let hpPoints: number | 'FULL' = 95;
hpPoints = 'FULL'; // Se puede asignar un string porque hpPoints es de tipo number o 'FULL'
hpPoints = 100; // También se puede asignar un número
//hpPoints = 'Hola'; // Error: 'Hola' no es un tipo válido para hpPoints

const isAlive: boolean = true;

console.log({name, hpPoints, isAlive});


export {};