import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable ,map} from 'rxjs'
import { environment } from '../../../environments/environment'
import { Payment } from '../../interfaces/payment'
import { ApiResponse } from '../../interfaces/api-response'

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
    private baseUrl = environment.apiUrl+'/payments';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Payment[]> {
    return this.http.get<ApiResponse<Payment[]>>(this.baseUrl).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
  getById(id: number): Observable<Payment> {
    return this.http.get<ApiResponse<Payment>>(`${this.baseUrl}/${id}`).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
  create(payment: Partial<Payment>): Observable<Payment> {
    return this.http.post<ApiResponse<Payment>>(this.baseUrl, payment).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
  update(id: number, payment: Partial<Payment>): Observable<Payment> {
    return this.http.put<ApiResponse<Payment>>(`${this.baseUrl}/${id}`, payment).pipe(
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
          return;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  getByUser(): Observable<Payment[]> {
    return this.http.get<ApiResponse<Payment[]>>(`${this.baseUrl}/user/payments`).pipe(
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
