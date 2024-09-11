import { Component, OnInit } from '@angular/core';
import { CountryInfoService } from '../../../services/country-info.service';
import { Country } from '../../../models/country';
import { combineLatest, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/envionment';
import { HolidayWidgetInfo } from '../../../models/holiday-widget-info';

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

  randomCountriesWidget = [] as HolidayWidgetInfo[];

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

    this.randomCountriesWidget = this.selectRandomCountries();
  }

  private selectRandomCountries() {
    let selectedCountries = [] as HolidayWidgetInfo[];

    for(let i = 0; i < environment.NUMBER_OF_COUNTRIES_ON_WIDGET; i++) {
      const randomIndex = Math.floor(Math.random() * this.allCountries.length);
      const randomCountry = this.allCountries[randomIndex];
      this.countryInfoService.getNextHolidayInfo(randomCountry.countryCode)
        .subscribe(
          resp => {
            let holidayWidgetInfo: HolidayWidgetInfo = {
              countryName: randomCountry.name,
              holidayName: resp?.name,
              date: resp?.date
            }

            selectedCountries.push(holidayWidgetInfo);
          }
        )
    }

    return selectedCountries;

    return selectedCountries;
  }
}
