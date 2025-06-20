import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollStateService {
  private trendingScrollState = signal<number>(0);

  // Método para obtener el valor actual del scroll
  getTrendingScrollState(): number {
    return this.trendingScrollState();
  }

  // Método para actualizar el valor del scroll
  setTrendingScrollState(value: number): void {
    this.trendingScrollState.set(value);
    
  }
}
