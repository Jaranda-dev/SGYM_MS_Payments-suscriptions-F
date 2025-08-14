import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Subscription } from '../../interfaces/subscription';
import { ApiResponse } from '../../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private baseUrl = environment.apiUrl + '/subscriptions';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Subscription[]> {
    return this.http.get<ApiResponse<Subscription[]>>(this.baseUrl).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
  getById(id: number): Observable<Subscription> {
    return this.http.get<ApiResponse<Subscription>>(`${this.baseUrl}/${id}`).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
  create(subscription: any): Observable<Subscription> {
    return this.http.post<ApiResponse<Subscription>>(this.baseUrl, subscription).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
  update(id: number, subscription: Partial<Subscription>): Observable<Subscription> {
    return this.http.put<ApiResponse<Subscription>>(`${this.baseUrl}/${id}`, subscription).pipe(
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
  getByUser(): Observable<Subscription[]> {
    return this.http.get<ApiResponse<Subscription[]>>(`${this.baseUrl}/user/subscriptions`).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );

  }

  subscribeToMembership(params: { MembershipId: number; PaymentMethodId: number;  PromotionId?: number; isRenewable?: boolean }): Observable<void> {
    const { MembershipId, PaymentMethodId, PromotionId, isRenewable } = params;
    return this.http.post<ApiResponse<void>>(`${this.baseUrl}/user/subscribe`, { MembershipId, PaymentMethodId, PromotionId, isRenewable }).pipe(
      map(response => {
        if (response.status === 'success') {
          return;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

}
