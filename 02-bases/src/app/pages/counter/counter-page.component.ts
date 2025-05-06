import { Component } from '@angular/core';

@Component({
  template: `
    <h1>Hola Mundo, Counter: {{ counter }}</h1>
    <button (click)="increaseBy(1)">+1</button>
  `,
})
export class CounterPageComponent {
  counter = 10;

  increaseBy(value: number) {
    this.counter += value;
  }
}
