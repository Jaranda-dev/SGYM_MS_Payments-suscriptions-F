import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserPaymentMethod } from '../../interfaces/user-payment-method';
import { ApiResponse } from '../../interfaces/api-response';
@Injectable({
  providedIn: 'root'
})
export class UserPaymentMethodService {
  baseUrl = `${environment.apiUrl}/user-payment-methods`;
  constructor(private http: HttpClient) { }
  getAll(): Observable<UserPaymentMethod[]> {
    return this.http.get<ApiResponse<UserPaymentMethod[]>>(this.baseUrl).pipe(
      map(response => response.data)
    );
  }
  getById(id: number): Observable<UserPaymentMethod> {
    return this.http.get<ApiResponse<UserPaymentMethod>>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }
  create(userPaymentMethod: UserPaymentMethod): Observable<UserPaymentMethod> {
    return this.http.post<ApiResponse<UserPaymentMethod>>(this.baseUrl, userPaymentMethod).pipe(
      map(response => response.data)
    );
  }
  update(id: number, userPaymentMethod: UserPaymentMethod): Observable<UserPaymentMethod> {
    return this.http.put<ApiResponse<UserPaymentMethod>>(`${this.baseUrl}/${id}`, userPaymentMethod).pipe(
      map(response => response.data)
    );
  }
  delete(id: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }
  getByUser(): Observable<UserPaymentMethod[]> {
    return this.http.get<ApiResponse<UserPaymentMethod[]>>(`${this.baseUrl}/user/methods`).pipe(
      map(response => response.data)
    );
  }

  createbypaymentMethod(payment_method_id: string): Observable<UserPaymentMethod> {
    return this.http.post<ApiResponse<UserPaymentMethod>>(`${this.baseUrl}/createby/payment-method-id`, { payment_method_id }).pipe(
      map(response => response.data)
    );
  }

  getDefault(): Observable<UserPaymentMethod | null> {
    return this.http.get<ApiResponse<UserPaymentMethod | null>>(`${this.baseUrl}/user/default`).pipe(
      map(response => response.data)
    );
  }

}
