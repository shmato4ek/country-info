import { Injectable } from '@angular/core';
import { environment } from '../../environments/envionment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private readonly apiUrl = environment.API_URL;

  constructor(protected httpClient: HttpClient) {}

  public getFullRequest<TRequest>(
    url: string,
    httpParams?: HttpParams
  ): Observable<HttpResponse<TRequest>> {
    return this.httpClient.get<TRequest>(`${this.apiUrl}/${url}`, {
      observe: 'response',
      params: httpParams,
    });
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
