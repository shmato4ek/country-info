import { Component } from '@angular/core';
import { CountryInfoService } from '../../../services/country-info.service';
import { Country } from '../../../models/country';
import { combineLatest, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HolidayWidgetInfo } from '../../../models/holiday-widget-info';
import { Router } from '@angular/router';
import { FlagConverterHelper } from '../../../helpers/flag-converter.helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  allCountries = [] as Country[];

  allCountries$ = {} as Observable<Country[]>;
  filteredCountries$ = {} as Observable<Country[]>;
  filter = {} as FormControl;
  filter$ = {} as Observable<string>;

  test = '\uD83D\uDE42';

  numberOfCountries: number;

  randomCountriesWidget = [] as HolidayWidgetInfo[];

  constructor(
    private countryInfoService: CountryInfoService,
    private router: Router,
    private flagConverterHelper: FlagConverterHelper
  ) {
    this.filter = new FormControl('');

    this.countryInfoService.getAllCountries().subscribe(resp => {
      this.allCountries = resp;

      this.initCountrySearch(resp);

      this.randomCountriesWidget = this.selectRandomCountries();
    });

    this.numberOfCountries = Number(
      process.env['NUMBER_OF_COUNTRIES_ON_WIDGET']
    );
  }

  private selectRandomCountries() {
    const selectedCountries = [] as HolidayWidgetInfo[];

    for (let i = 0; i < this.numberOfCountries; i++) {
      const randomIndex = Math.floor(Math.random() * this.allCountries.length);
      const randomCountry = this.allCountries[randomIndex];

      this.countryInfoService
        .getNextHolidayInfo(randomCountry.countryCode)
        .subscribe(resp => {
          const holidayWidgetInfo: HolidayWidgetInfo = {
            countryName: randomCountry.name,
            holidayName: resp?.name,
            date: resp?.date,
            countryCode: resp?.countryCode
          };

          selectedCountries.push(holidayWidgetInfo);
        });
    }

    return selectedCountries;
  }

  countryCodeToFlag(countryCode: string) {
    return this.flagConverterHelper.countryCodeToFlag(countryCode);
  }

  navigateToCountryInfo(countryCode?: string) {
    this.router.navigate([`countries/${countryCode}`]);
  }

  private initCountrySearch(countries: Country[]) {
    this.allCountries$ = of(countries);
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));

    this.filteredCountries$ = combineLatest([
      this.allCountries$,
      this.filter$,
    ]).pipe(
      map(([allCountries, filterString]) =>
        allCountries.filter(country =>
          country.name
            .toLowerCase()
            .startsWith(filterString.toLowerCase().trim())
        )
      )
    );
  }
}
