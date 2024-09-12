import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private readonly apiUrl;

  constructor(protected httpClient: HttpClient) {
    this.apiUrl = process.env['API_URL'];
  }

  public getFullRequest<TRequest>(
    url: string,
    httpParams?: HttpParams
  ): Observable<HttpResponse<TRequest>> {
    return this.httpClient.get<TRequest>(`${this.apiUrl}/${url}`, {
      observe: 'response',
      params: httpParams,
    });
  }
}
