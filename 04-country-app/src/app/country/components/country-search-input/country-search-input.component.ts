import { Component, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {

  txtSearch = output<string>();

  onSearch(txtSearch: string) {
    this.txtSearch.emit(txtSearch);
  }
}
