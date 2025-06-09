/**
 * Representa una persona con nombre y dirección.
 *
 * Una clase en TypeScript es una plantilla para crear objetos con propiedades y métodos.
 * El constructor es un método especial que se ejecuta al crear una nueva instancia de la clase,
 * permitiendo inicializar las propiedades del objeto.
 *
 * En este caso, la clase `Person` define dos propiedades:
 * - `name`: el nombre de la persona (pública).
 * - `address`: la dirección de la persona (privada, con valor por defecto "No Address").
 *
 * El constructor utiliza una sintaxis abreviada para declarar y asignar automáticamente
 * las propiedades a partir de los parámetros recibidos.
 *
 * Ejemplo de uso:
 * ```typescript
 * const iroman = new Person("Iroman", "Av. Siempre Viva 123");
 * console.log(iroman);
 * ```
 */
export class Person {
  //   public name: string;
  //   private address: string;

  //   constructor(name: string, address: string) {
  //     this.name = name;
  //     this.address = address;
  //   }

  constructor(public name: string, private address: string = `No Address`) {}
  // The properties are automatically assigned
}

// Definición de la clase SuperHero que extiende (hereda de) la clase Person
//export class SuperHero extends Person {
// El constructor recibe tres parámetros y los declara como propiedades públicas
//constructor(
//public alterEgo: string,   // Nombre alternativo del superhéroe (ej: "Spider-Man")
//public age: number,        // Edad del superhéroe
//public realName: string    // Nombre real del superhéroe (ej: "Peter Parker")
//) {
// Llama al constructor de la clase base (Person) pasando el nombre real y una ciudad fija
//super(realName, "New York"); // Llama al constructor de Person con realName y "New York"
//}
//}

export class SuperHero {
  //public person: Person; // Propiedad que contendrá una instancia de Person

  constructor(
    public alterEgo: string,
    public age: number,
    public realName: string,
    public person: Person,
  ) {
    //this.person = new Person(realName, "New York"); // Crea una nueva instancia de Person
  }
}

const person = new Person("Tony", "Av. Siempre Viva 123");
const iroman = new SuperHero("Iroman", 45, "Tony Stark",person);

console.log(iroman);
