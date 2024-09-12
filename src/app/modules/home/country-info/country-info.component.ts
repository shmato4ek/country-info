import { Component } from '@angular/core';
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

  startYear = Number(process.env['PAGINATION_START_YEAR']) || 2020;
  endYear = Number(process.env['PAGINATION_END_YEAR']) || 2030;

  constructor(
    private activateRoute: ActivatedRoute,
    private countryInfoService: CountryInfoService
  ) {
    for (let year = this.startYear; year <= this.endYear; year++) {
      this.allYears.push(year);
    }

    const countryCode = this.activateRoute.snapshot.params['countryCode'];

    this.countryInfoService.getCountryInfo(countryCode).subscribe(resp => {
      this.currentCountry = resp;

      this.setCountryHolidaysByYear(
        this.currentCountry.countryCode,
        this.currentYear
      );
    });

    this.currentYear = Number([process.env['DEFAULT_COUNTRY_HOLIDAYS_YEAR']]);
  }

  changeCurrentYear(year: number) {
    this.currentYear = year;

    this.setCountryHolidaysByYear(
      this.currentCountry.countryCode,
      this.currentYear
    );
  }

  moveToNextYear() {
    if (this.currentYear != this.endYear) {
      this.changeCurrentYear(this.currentYear + 1);
    }
  }

  moveToPreviousYear() {
    if (this.currentYear != this.startYear) {
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
