import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifsService } from 'src/app/gifs/services/gifs.service';
interface MenuOption {
  label: string;
  sublabel: string;
  router: string;
  icon: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class GifsSideMenuOptionsComponent {

  private gifsService = inject(GifsService);
  searchHistoryKeys = this.gifsService.searchHistoryKeys;

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      sublabel: 'GIFs Populares',
      router: '/dashboard/trending',
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      sublabel: 'Buscar GIFs',
      router: '/dashboard/search',
    },
  ];
}
// This component defines a list of menu options for the side menu in the GIFs application.
