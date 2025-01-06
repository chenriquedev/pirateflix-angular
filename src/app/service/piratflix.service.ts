import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PiratflixServiceService {
  private baseUrl = import.meta.env.NG_APP_BASE_URL
  constructor(private httpClient: HttpClient) { }

  get<T>(url: string, params?: Params): Observable<T> {
    return this.httpClient.get<T>(url, {params})
  }
}
