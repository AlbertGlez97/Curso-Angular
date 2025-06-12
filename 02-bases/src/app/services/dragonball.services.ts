import { Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root',   // Proporciona el servicio a nivel de toda la aplicación    
})
export class DragonballService {
 // Signal que contiene el array de personajes
  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9000 },
    { id: 2, name: 'Vegeta', power: 85000 },
    { id: 3, name: 'Piccolo', power: 4000 },
    { id: 4, name: 'Gohan', power: 6000 },
    { id: 5, name: 'Frieza', power: 12000 },
    { id: 6, name: 'Cell', power: 11000 },
    { id: 7, name: 'Majin Buu', power: 13000 },
    { id: 8, name: 'Trunks', power: 5000 },
    { id: 9, name: 'Bulma', power: 100 },
  ]);

  addCharacter(character: Character) {
    // Agrega un nuevo personaje al array de personajes
    this.characters.update((characters) => [...characters, character]);
  }
}
