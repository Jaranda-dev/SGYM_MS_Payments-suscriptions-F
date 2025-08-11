import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Promotion } from '../../interfaces/promotion';
import { ApiResponse } from '../../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private baseUrl = environment.apiUrl + '/promotions';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Promotion[]> {
    return this.http.get<ApiResponse<Promotion[]>>(this.baseUrl).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
  getById(id: number): Observable<Promotion> {
    return this.http.get<ApiResponse<Promotion>>(`${this.baseUrl}/${id}`).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
  create(promotion: Partial<Promotion>): Observable<Promotion> {
    return this.http.post<ApiResponse<Promotion>>(this.baseUrl, promotion).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
  update(id: number, promotion: Partial<Promotion>): Observable<Promotion> {
    return this.http.put<ApiResponse<Promotion>>(`${this.baseUrl}/${id}`, promotion).pipe(
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

  getPromotionByMembershipId(membershipId: number): Observable<Promotion[] | null> {
    return this.http.get<ApiResponse<Promotion[] | null>>(`${this.baseUrl}/membership/${membershipId}`).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data 
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

}
