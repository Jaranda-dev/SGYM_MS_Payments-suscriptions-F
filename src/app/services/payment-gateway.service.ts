import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from '../../environments/environment';
import { SetupIntentResponse } from '../interfaces/payment-gateway';

@Injectable({
  providedIn: 'root'
})
export class PaymentGatewayService {

  baseUrl = environment.apiUrl + '/payment-gateway';

  constructor(private http: HttpClient) { }

 

  setupIntent(): Observable<ApiResponse<SetupIntentResponse>> {
    return this.http.post<ApiResponse<SetupIntentResponse>>(`${this.baseUrl}/setup-intent`, {});
  }

}
  