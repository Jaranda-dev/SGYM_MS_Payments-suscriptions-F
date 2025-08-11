import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiAuth+'/oauth';
  private url = environment.url;

  constructor(private http: HttpClient) { }

  access(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/access/payments`);
  }

  refresh(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/refresh`);
  }

  redirectToLogin() {
    return this.http.get(`${this.baseUrl}/login?redirect=redirect_uri=${this.url}`);
  }

  hasPermission(page: string): Observable<boolean> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/access/permissions?page=${page}`).pipe(
      map(response => response.status === 'success')
    );
  }

}
