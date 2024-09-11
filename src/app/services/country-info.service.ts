import { Injectable } from "@angular/core";
import { ResourceService } from "./resource.service";
import { Country } from "../models/country";
import { map } from "rxjs/operators"
import { CountryInfo } from "../models/country-info";
import { CountryHolidayInfo } from "../models/country-holiday-info";

@Injectable({
    providedIn: 'root'
})

export class CountryInfoService {
    constructor(private resourceService: ResourceService) {}

    public getAllCountries() {
        return this.resourceService.getFullRequest<Country[]>('AvailableCountries')
            .pipe(
                map(resp => {
                    return resp.body as Country[];
                })
            );
    }

    public getCountryInfo(countryCode: string) {
        return this.resourceService.getFullRequest<CountryInfo>(`CountryInfo/${countryCode}`)
            .pipe(
                map(resp => {
                    return resp.body as CountryInfo;
                })
            )
    }

    public getNextHolidayInfo(countryCode: string) {
        return this.resourceService.getFullRequest<CountryHolidayInfo[]>(`NextPublicHolidays/${countryCode}`)
            .pipe(
                map(resp => {
                    if(resp.body != null) {
                        return resp.body[0] as CountryHolidayInfo;
                    } else {
                        return null;
                    }
                })
            )
    }
}