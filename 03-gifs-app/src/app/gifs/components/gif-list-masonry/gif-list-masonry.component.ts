import { Component, input } from '@angular/core';
import { Gif } from '../../interfaces/gif.interface';
import { GifListItemComponent } from "../gif-list/gif-list-item/gif-list-item.component";

@Component({
  selector: 'gif-list-masonry',
  imports: [GifListItemComponent],
  templateUrl: './gif-list-masonry.component.html',
})
export class GifListMasonryComponent { 
  gifsGroup = input.required<Gif[][]>();
}
