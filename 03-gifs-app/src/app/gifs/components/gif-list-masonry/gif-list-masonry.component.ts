import { Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { Gif } from '../../interfaces/gif.interface';
import { GifListItemComponent } from './gif-list-item/gif-list-item.component';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gif-list-masonry',
  imports: [GifListItemComponent],
  templateUrl: './gif-list-masonry.component.html',
})
export class GifListMasonryComponent {

  private gifsService = inject(GifsService);
  gifsGroup = input.required<Gif[][]>();

  scrollDivRef = viewChild<ElementRef>('groupDiv');

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if (!scrollDiv) return;

    const { scrollTop, clientHeight, scrollHeight } = scrollDiv;

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    if(isAtBottom) {
      this.gifsService.loadTrendingGifs();
    }
  }
}
