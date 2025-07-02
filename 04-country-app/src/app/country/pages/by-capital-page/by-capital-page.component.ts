import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'by-capital-page',
  imports: [CountryListComponent, CountrySearchInputComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService)

  onSearchByCapital(textSearch: string): void {
    console.log('Desde ByCapitalPage');
    console.log(textSearch);
    this.countryService.searchByCapital(textSearch).subscribe((resp) => {
      console.log(resp)
    })

  }

}
