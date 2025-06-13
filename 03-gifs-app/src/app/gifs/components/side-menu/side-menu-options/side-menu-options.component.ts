import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
