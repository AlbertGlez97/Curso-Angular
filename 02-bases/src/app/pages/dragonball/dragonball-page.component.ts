import { Component, signal, Pipe, PipeTransform } from '@angular/core';

// Definición de la interfaz Character para tipar los personajes
interface Character {
  id: number;
  name: string;
  power: number;
}

// - **PipeTransform** es una interfaz de Angular que obliga a implementar el método `transform`. Esta interfaz se usa para crear pipes personalizados,
// que permiten transformar datos directamente en las plantillas HTML.
// - **transform** es el método que define la lógica de transformación. Angular lo llama automáticamente cuando usas el pipe en la plantilla. Por ejemplo,
// si usas `characters | orderBy:'power':'desc'`, Angular ejecuta el método `transform` de tu pipe, pasando el array de personajes, el campo `'power'` y la dirección `'desc'`.
// **Resumen:**
// El pipe `OrderByPipe` permite ordenar arrays en la plantilla según un campo y una dirección. `PipeTransform` asegura que tu pipe tenga el método `transform`, que es donde
// defines cómo transformar (en este caso, ordenar) los datos.

// Decorador @Pipe para crear un pipe personalizado llamado 'orderBy'
@Pipe({
  name: 'orderBy',
})
// La clase OrderByPipe implementa la interfaz PipeTransform
export class OrderByPipe implements PipeTransform {
  // El método transform es obligatorio al implementar PipeTransform
  // Recibe un array, el campo por el que ordenar y la dirección ('asc' o 'desc')
  transform(
    array: any[],
    field: string,
    direction: 'asc' | 'desc' = 'asc'
  ): any[] {
    if (!Array.isArray(array)) return array; // Si no es un array, retorna tal cual
    // Retorna una copia ordenada del array según el campo y dirección indicados
    return array.slice().sort((a, b) => {
      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }
}

// Decorador @Component para definir el componente principal
@Component({
  selector: 'app-dragonball',
  imports: [OrderByPipe], // Importa el pipe personalizado para usarlo en la plantilla
  templateUrl: './dragonball-page.component.html',
})
export class DragonballPageComponent {
  name = signal<string>(''); // Signal que contiene el nombre del componente
  power = signal<number>(0); // Signal que contiene el poder del personaje seleccionado

  // Signal que contiene el array de personajes
  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9000 },
  ]);

  addCharacter() {
    if (!this.name() || this.name().trim() === '' || this.power() <= 0) {
      // Si el nombre está vacío o solo contiene espacios, o si el poder es menor o igual a 0,
      return;
    }

    // Agrega un nuevo personaje al array de personajes
    this.characters.update((characters) => [
      ...characters,
      {
        id: characters.length + 1,
        name: this.name(),
        power: this.power(), // Poder aleatorio entre 1000 y 11000
      },
    ]);

    this.resetFileds(); // Resetea los campos de nombre y poder
  }

  resetFileds() {
    // Resetea los campos de nombre y poder a sus valores iniciales
    this.name.set(''); // Resetea el nombre a una cadena vacía
    this.power.set(0); // Resetea el poder a 0
  }

  isNaN(value: any): boolean {
    // Verifica si el valor es NaN (Not a Number)
    return isNaN(value) || value === null || value === undefined;
  }
}
