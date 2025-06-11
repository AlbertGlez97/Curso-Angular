import { Component , signal} from '@angular/core';

@Component({
  // template: `
  //   <h1>Hola Mundo, Counter: {{ counter }}</h1>
  //   <button (click)="increaseBy(1)">+1</button>
  // `,
  templateUrl: './counter-page.component.html',
})
export class CounterPageComponent {
  counter = 10;
  counterSignal = signal(10);

  increaseBy(value: number) {
    this.counter += value;
    // this.counterSignal.set(this.counterSignal + value);
    this.counterSignal.update(current => current + value);
  }

  resetCounter() {
    this.counter = 0;
    this.counterSignal.set(0);
  }

  decreaseBy(value: number) {
    this.counter -= value;

    // this.counterSignal.set(this.counterSignal - value);
    this.counterSignal.update(current => current - value);
  }
}
