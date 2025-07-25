import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PiratflixServiceService {
  private baseUrl = '/api';
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string, params?: Params, baseUrl?: string): Observable<T> {
    return this.httpClient.get<T>((baseUrl || this.baseUrl) + url, { params });
  }
}
