import { Component, signal, inject, computed } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { GifListMasonryComponent } from "../../components/gif-list-masonry/gif-list-masonry.component";

@Component({
  selector: 'app-trending-page',
  imports: [ GifListMasonryComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {
  private gifService = inject(GifsService);

  gifsGroup = computed(() => this.gifService.trendigGifGroup());
  
}
