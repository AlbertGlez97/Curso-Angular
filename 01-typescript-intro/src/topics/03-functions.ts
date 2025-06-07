/**
 * Diferencia principal entre una función normal y una arrow function:
 * - Las funciones normales (`function`) tienen su propio contexto de `this` y pueden ser utilizadas antes de su declaración (hoisting).
 * - Las arrow functions (`=>`) no tienen su propio `this` (heredan el contexto donde fueron creadas) y no pueden ser utilizadas antes de su declaración.
 */

/**
 * Hoisting es un comportamiento de JavaScript donde las declaraciones de funciones y variables son "elevadas" al inicio de su contexto de ejecución.
 * 
 * Ejemplo de hoisting con funciones:
 * 
 * console.log(sumar(2, 3)); // 5
 * function sumar(a, b) {
 *   return a + b;
 * }
 * 
 * // Esto funciona porque las funciones declaradas con 'function' son elevadas.
 * 
 * // Pero con arrow functions no ocurre hoisting:
 * 
 * // console.log(restar(5, 2)); // Error: Cannot access 'restar' before initialization
 * const restar = (a, b) => a - b;
 */

function addNumbers(a: number, b: number): number {
  return a + b;
}

const addNumbersArrow = (a: number, b: number): string => {
  return `${a + b}`;
};

function multiplyNumbers(
  firstNumber: number,
  secondNumber?: number,
  base: number = 2
): number {
  return firstNumber * base;
}

//const result: number = addNumbers(5, 5); // 10
//const resultArrow: string = addNumbersArrow(5, 5); // "10"
//const resultMultiply: number = multiplyNumbers(5); // 10
//console.log({ result, resultArrow,resultMultiply }); // Output: { result: 15, resultArrow: '15' }


// Definición de la interfaz Character, que describe la forma de un personaje
interface Character {
  name: string; // Nombre del personaje
  hp: number;   // Puntos de vida (health points)
  showHp: () => void; // Método para mostrar los puntos de vida
}

// Función que cura a un personaje aumentando su hp
function healCharacter(character: Character, amount: number) {
    character.hp += amount; // Suma la cantidad indicada a los puntos de vida
}

// Creación de un objeto que implementa la interfaz Character
const strider: Character = {
  name: 'Strider',
  hp: 50,
  // Método para mostrar los puntos de vida actuales
  showHp() {
      // 'this' se refiere al objeto actual (strider en este caso)
      // Permite acceder a las propiedades del objeto dentro de sus métodos
      console.log(`HP: ${this.hp}`);
  }
};

// Muestra los puntos de vida iniciales
strider.showHp(); // Output: HP: 50

// Cura al personaje sumando 20 puntos de vida
healCharacter(strider, 20);

// Muestra los puntos de vida después de curar
strider.showHp(); // Output: HP: 70

export {};
