import { AfterViewInit, Component, ElementRef, input, output, viewChild, effect } from '@angular/core';
import { Gif } from '../../interfaces/gif.interface';
import { GifListItemComponent } from './gif-list-item/gif-list-item.component';

@Component({
  selector: 'gif-list-masonry',
  imports: [GifListItemComponent],
  templateUrl: './gif-list-masonry.component.html',
})
export class GifListMasonryComponent implements AfterViewInit {

  // Recibe el grupo de gifs (arreglo de arreglos de gifs) como input obligatorio
  gifsGroup = input.required<Gif[][]>();

  // Input que recibe el scroll state
  scrollState = input<number>(0);

  // Output que emite un booleano indicando si el usuario llegó al fondo del scroll
  isAtBottom = output<boolean>();

  // Output que emite el valor del scroll
  scrollTop = output<number>();

  // Referencia al div que contiene la lista de gifs para poder detectar el scroll
  scrollDivRef = viewChild<ElementRef>('groupDiv');

  // Flag para evitar restaurar el scroll múltiples veces
  private scrollRestored = false;

  constructor() {
    // Effect que se ejecuta cuando cambian los gifs para restaurar el scroll
    effect(() => {
      const gifs = this.gifsGroup();
      const scrollTop = this.scrollState();
      
      // Solo restaurar si hay gifs y hay una posición guardada
      if (gifs && gifs.length > 0 && scrollTop > 0 && !this.scrollRestored) {
        this.restoreScrollPosition(scrollTop);
        this.scrollRestored = true;
      }
    });
  }

  ngAfterViewInit(): void {
    // Restaurar posición inicial del scroll solo una vez si ya hay datos
    if (!this.scrollRestored) {
      const savedScrollTop = this.scrollState();
      const gifs = this.gifsGroup();
      
      if (savedScrollTop > 0 && gifs && gifs.length > 0) {
        this.restoreScrollPosition(savedScrollTop);
        this.scrollRestored = true;
      }
    }
  }

  private restoreScrollPosition(scrollTop: number): void {
    setTimeout(() => {
      const scrollDiv = this.scrollDivRef()?.nativeElement;
      if (scrollDiv && scrollTop > 0) {
        scrollDiv.scrollTop = scrollTop;
      }
    }, 100); // Delay para asegurar que el contenido esté renderizado
  }

  /**
   * Método que se ejecuta al hacer scroll en el contenedor de gifs.
   * Verifica si el usuario está cerca del fondo (a 300px o menos) y emite el resultado.
   * @param event Evento de scroll
   */
  onScroll(_: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    // Desestructuramos las propiedades necesarias para calcular la posición del scroll
    const { scrollTop, clientHeight, scrollHeight } = scrollDiv;

    // Calculamos si el usuario está a menos de 300px del fondo
    const atBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    // Emitimos el resultado para que el componente padre pueda reaccionar (por ejemplo, cargar más gifs)
    this.isAtBottom.emit(atBottom);

    // Emitimos el valor del scroll para que el componente padre pueda actualizar el estado del scroll
    this.scrollTop.emit(scrollTop);
  }
}
