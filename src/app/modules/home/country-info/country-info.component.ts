import { Component } from '@angular/core';
import { environment } from '../../../../environments/envionment';
import { ActivatedRoute } from '@angular/router';
import { CountryInfo } from '../../../models/country-info';
import { CountryInfoService } from '../../../services/country-info.service';
import { CountryHolidayInfo } from '../../../models/country-holiday-info';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrl: './country-info.component.css',
})
export class CountryInfoComponent {
  allYears = [] as number[];
  currentCountry = {} as CountryInfo;
  countryHolidays = [] as CountryHolidayInfo[];
  currentYear: number;

  constructor(
    private activateRoute: ActivatedRoute,
    private countryInfoService: CountryInfoService
  ) {
    for (
      let year = environment.PAGINATION_START_YEAR;
      year <= environment.PAGINATION_END_YEAR;
      year++
    ) {
      this.allYears.push(year);
    }

    const countryCode = this.activateRoute.snapshot.params['countryCode'];

    this.countryInfoService.getCountryInfo(countryCode).subscribe(resp => {
      this.currentCountry = resp;
    });

    this.currentYear = environment.DEFAULT_COUNTRY_HOLIDAYS_YEAR;

    this.setCountryHolidaysByYear(
      this.currentCountry.countryCode,
      this.currentYear
    );
  }

  changeCurrentYear(year: number) {
    this.currentYear = year;

    this.setCountryHolidaysByYear(
      this.currentCountry.countryCode,
      this.currentYear
    );
  }

  moveToNextYear() {
    if (this.currentYear != environment.PAGINATION_END_YEAR) {
      this.changeCurrentYear(this.currentYear + 1);
    }
  }

  moveToPreviousYear() {
    if (this.currentYear != environment.PAGINATION_START_YEAR) {
      this.changeCurrentYear(this.currentYear - 1);
    }
  }

  isYearCurrent(year: number) {
    return this.currentYear == year;
  }

  private setCountryHolidaysByYear(countryCode: string, year: number) {
    this.countryInfoService
      .getCountryHolidaysByYear(countryCode, year)
      .subscribe(resp => {
        this.countryHolidays = resp;
      });
  }
}
