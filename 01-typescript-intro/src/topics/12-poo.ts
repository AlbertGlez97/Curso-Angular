// Programación Orientada a Objetos (POO)
// Definiciones y ejemplo con animales domésticos

// 1. Clase: Es un molde o plantilla que define las propiedades y métodos de un objeto.
class AnimalDomestico {
    // 2. Propiedades: Son las características o atributos de la clase.
    nombre: string;
    edad: number;

    // 3. Constructor: Método especial para crear e inicializar objetos.
    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
    }

    // 4. Método: Son las acciones o comportamientos que puede realizar un objeto.
    hacerSonido(): void {
        console.log(`${this.nombre} hace un sonido.`);
    }
}

// 5. Herencia: Permite crear una nueva clase basada en otra existente.
class Perro extends AnimalDomestico {
    raza: string;

    constructor(nombre: string, edad: number, raza: string) {
        super(nombre, edad); // Llama al constructor de la clase base
        this.raza = raza;
    }

    // 6. Polimorfismo: Permite que una misma acción se comporte de manera diferente en distintas clases.
    hacerSonido(): void {
        console.log(`${this.nombre} dice: ¡Guau!`);
    }
}

// 7. Encapsulamiento: Oculta los detalles internos de una clase y solo expone lo necesario.
class Gato extends AnimalDomestico {
    private color: string; // Propiedad privada, solo accesible dentro de la clase

    constructor(nombre: string, edad: number, color: string) {
        super(nombre, edad);
        this.color = color;
    }

    hacerSonido(): void {
        console.log(`${this.nombre} dice: ¡Miau!`);
    }

    // Método público para acceder a la propiedad privada
    obtenerColor(): string {
        return this.color;
    }
}

// 8. Abstracción: Permite trabajar con ideas generales y no con detalles específicos.
// En este ejemplo, AnimalDomestico es una abstracción de un animal doméstico.

// Ejemplo de uso:
const miPerro = new Perro('Firulais', 3, 'Labrador');
const miGato = new Gato('Misu', 2, 'Negro');

miPerro.hacerSonido(); // Firulais dice: ¡Guau!
miGato.hacerSonido();  // Misu dice: ¡Miau!
console.log(miGato.obtenerColor()); // Negro