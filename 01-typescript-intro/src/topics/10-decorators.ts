// Un Decorador en TypeScript es una función especial que puede ser adjuntada a clases, métodos, propiedades o parámetros.
// Permite modificar o extender el comportamiento de estos elementos de manera declarativa.

// Definición de un decorador de clase.
// Este decorador recibe el constructor de la clase y retorna una nueva clase que extiende la original,
// agregando o sobrescribiendo propiedades.
function classDecorator<T extends { new (...args: any[]): {} }>(
    constructor: T
) {
    // Retorna una nueva clase que extiende la clase original
    return class extends constructor {
        newProperty: string = "new property"; // Nueva propiedad agregada
        hello: string = "override";           // Propiedad sobrescrita o agregada
    };
}

// Se aplica el decorador a la clase SuperClass.
// Esto hace que la clase resultante tenga las propiedades adicionales definidas en el decorador.
@classDecorator
export class SuperClass {
    public myProperty: string = "Abc123"; // Propiedad original de la clase

    // Método de la clase
    print() {
        console.log("Hola Mundo");
    }
}

// Muestra la definición de la clase decorada en consola
console.log(SuperClass);

const myClass = new SuperClass(); // Crea una instancia de la clase decorada

// Muestra la instancia de la clase, que ahora incluye las nuevas propiedades agregadas por el decorador
console.log(myClass);
