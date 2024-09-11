import { Injectable } from "@angular/core";
import { ResourceService } from "./resource.service";
import { Country } from "../models/country";
import { map } from "rxjs/operators"

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
}