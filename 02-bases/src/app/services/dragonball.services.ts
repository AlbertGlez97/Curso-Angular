import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

function loadFromLocalStorage(): Character[] {
  // Carga los personajes desde el Local Storage, si existen
  const characters = localStorage.getItem('characters');

  if (characters) {
    try {
      const parsed = JSON.parse(characters);
      // Comprueba que sea un array y que cada elemento tenga las propiedades de Character
      if (Array.isArray(parsed) && parsed.every(item => typeof item === 'object' && 'name' in item && 'power' in item)) {
        return parsed as Character[];
      }
    } catch (e) {
      // Si hay un error al parsear, retorna array vacío
      return [];
    }
  }

  return [];
}   

@Injectable({
  providedIn: 'root', // Proporciona el servicio a nivel de toda la aplicación
})
/**
 * Servicio para gestionar los personajes de Dragon Ball.
 *
 * - Mantiene una señal (`characters`) con el array de personajes.
 * - Guarda automáticamente los personajes en el Local Storage cada vez que cambian usando un efecto.
 * - Permite agregar nuevos personajes al array.
 *
 * @remarks
 * El método `addCharacter` agrega un nuevo personaje al array de personajes.
 *
 * @effect
 * El decorador `effect` crea un efecto reactivo que se ejecuta automáticamente cada vez que cambia el valor de la señal `characters`. En este caso, guarda el array actualizado en el Local Storage.
 */
export class DragonballService {
  // Signal que contiene el array de personajes
  characters = signal<Character[]>(loadFromLocalStorage());


  saveToLocalStorage = effect(() => {
    // Guarda los personajes en el Local Storage cada vez que cambian
    localStorage.setItem('characters', JSON.stringify(this.characters()));
  });

  addCharacter(character: Character) {
    // Agrega un nuevo personaje al array de personajes
    this.characters.update((characters) => [...characters, character]);
  }
}
