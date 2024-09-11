import { Component, OnInit } from '@angular/core';
import { CountryInfoService } from '../../../services/country-info.service';
import { Country } from '../../../models/country';
import { combineLatest, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  allCountries = [] as Country[];
  allCountries$: Observable<Country[]>
  filteredCountries$: Observable<Country[]>;
  filter: FormControl;
  filter$: Observable<string>;

  constructor(private countryInfoService: CountryInfoService) {
    this.countryInfoService.getAllCountries()
      .subscribe(resp => {
        this.allCountries = resp;
      });
    this.allCountries$ = of(this.allCountries);
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredCountries$ = combineLatest([this.allCountries$, this.filter$]).pipe(
      map(([allCountries, filterString]) => allCountries.filter(country => country.name.toLowerCase().startsWith(filterString.toLowerCase().trim())))
    );
  }
}
