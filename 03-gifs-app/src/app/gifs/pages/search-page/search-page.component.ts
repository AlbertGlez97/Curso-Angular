import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';
import { GifListMasonryComponent } from "../../components/gif-list-masonry/gif-list-masonry.component";

@Component({
  selector: 'app-search-page',
  imports: [GifListMasonryComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {
  private gifService = inject(GifsService);
  gifsGroup = signal<Gif[][]>([]);

  txtSearch = viewChild<ElementRef>('txtSearch');

  /**
   * Método que se ejecuta cuando se realiza una búsqueda.
   * Recibe la consulta de búsqueda como parámetro y la utiliza para buscar GIFs.
   * Los resultados se agrupan en subarreglos de máximo 3 elementos para el layout masonry.
   *
   * @param query - La consulta de búsqueda introducida por el usuario.
   */
  onSearch(query: string) {
    this.gifService.searchGifs(query).subscribe((resp) => {
      const gifs: Gif[] = resp;

      for (let i = 0; i < gifs.length; i += 3) {
        this.gifsGroup.update((prev) => [...prev, gifs.slice(i, i + 3)]);
      }
    });
  }

  onScroll(atBottom: boolean) {
    if (atBottom) {
      this.onSearch(this.txtSearch()?.nativeElement.value);
    }
  }
}
