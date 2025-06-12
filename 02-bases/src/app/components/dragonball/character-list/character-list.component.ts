import { Component, input, Pipe, PipeTransform } from '@angular/core';
import type { Character } from '../../../interfaces/character.interface';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(
    array: any[],
    field: string,
    direction: 'asc' | 'desc' = 'asc'
  ): any[] {
    if (!Array.isArray(array)) return array;
    return array.slice().sort((a, b) => {
      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }
}

@Component({
  selector: 'dragonball-character-list',
  imports: [OrderByPipe],
  templateUrl: './character-list.component.html',
})
export class CharacterListComponent { 

 characters = input.required<Character[]>(); // Signal que contiene el array de personajes
 listName = input.required<string>(); // Signal que contiene el nombre del componente
}
