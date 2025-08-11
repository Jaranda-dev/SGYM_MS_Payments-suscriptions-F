import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaymentMethod } from '../../interfaces/payment-method';
import { ApiResponse } from '../../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  
  private baseUrl = environment.apiUrl + '/payment-methods';
  constructor(private http: HttpClient) {}
  getAll(): Observable<PaymentMethod[]> {
    return this.http.get<ApiResponse<PaymentMethod[]>>(this.baseUrl).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
  getById(id: number): Observable<PaymentMethod> {
    return this.http.get<ApiResponse<PaymentMethod>>(`${this.baseUrl}/${id}`).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
  create(paymentMethod: Partial<PaymentMethod>): Observable<PaymentMethod> {
    return this.http.post<ApiResponse<PaymentMethod>>(this.baseUrl, paymentMethod).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
  update(id: number, paymentMethod: Partial<PaymentMethod>): Observable<PaymentMethod> {
    return this.http.put<ApiResponse<PaymentMethod>>(`${this.baseUrl}/${id}`, paymentMethod).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
  delete(id: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
 

}
