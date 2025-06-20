import { Component, signal, inject, computed } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { GifListMasonryComponent } from "../../components/gif-list-masonry/gif-list-masonry.component";
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  imports: [ GifListMasonryComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {
  private gifService = inject(GifsService);
  private scrollStateService = inject(ScrollStateService);

  gifsGroup = computed(() => this.gifService.trendigGifGroup());

  scrollState = computed(() => this.scrollStateService.getTrendingScrollState());

  onScroll(atBottom: boolean) {
    if (atBottom) {
      this.gifService.loadTrendingGifs();
    }
  }

  onScrollTop(scrollTop: number) {
    this.scrollStateService.setTrendingScrollState(scrollTop);
  }
}
