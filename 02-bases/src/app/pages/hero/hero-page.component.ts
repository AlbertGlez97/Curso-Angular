import { UpperCasePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './hero-page.component.html',
  imports: [UpperCasePipe],
})
export class HeroPageComponent {
  public name = signal('Ironman');
  public age = signal(45);

  heroDescription = computed(() => {
    return `${this.name()} - ${this.age()}`;
  });

  capitalizedName = computed(() => {
    return this.name().toUpperCase();
  });

  changeHero(): void {
    this.name.set('Spiderman');
    this.age.set(22);
  }

  resetForm(): void {
    this.name.set('Ironman');
    this.age.set(45);
  }

  chageAge(): void {
    this.age.set(60);
  }
}
