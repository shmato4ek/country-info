import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })

export class FlagConverterHelper {
    countryCodeToFlag(countryCode: string): string {
        return countryCode
            .toUpperCase()
            .split('')
            .map(char => String.fromCodePoint(char.charCodeAt(0) + 0x1F1A5))
            .join('');
    }
}