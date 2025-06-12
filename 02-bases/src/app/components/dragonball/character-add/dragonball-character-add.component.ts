import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'app-dragonball-character-add',
  imports: [],
  templateUrl: './dragonball-character-add.component.html',
})
export class DragonballCharacterAddComponent {
  name = signal('');
  power = signal(0);

  newCharacter = output<Character>();

  addCharacter() {
    if (!this.name() || this.name().trim() === '' || this.power() <= 0) {
      // Si el nombre está vacío o solo contiene espacios, o si el poder es menor o igual a 0,
      return;
    }

    // Agrega un nuevo personaje al array de personajes
    // this.characters.update((characters) => [
    //   ...characters,
    //   {
    //     id: characters.length + 1,
    //     name: this.name(),
    //     power: this.power(), // Poder aleatorio entre 1000 y 11000
    //   },
    // ]);

    this.newCharacter.emit({
      id: Math.floor(Math.random() * 100000), // Genera un ID único basado en la fecha actual
      name: this.name(), // Obtiene el nombre del personaje
      power: this.power(), // Obtiene el poder del personaje
    });

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
