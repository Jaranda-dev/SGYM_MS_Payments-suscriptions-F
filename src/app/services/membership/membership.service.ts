import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable ,map} from 'rxjs'
import { environment } from '../../../environments/environment'
import { Membership } from '../../interfaces/membership'
import { ApiResponse } from '../../interfaces/api-response'

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private baseUrl = environment.apiUrl+'/memberships'
 
constructor(private http: HttpClient) {}

  getAll(): Observable<Membership[]> {
    
    return this.http.get<ApiResponse<Membership[]>>(this.baseUrl).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data
        } else {
          throw new Error(response.msg)
        }
      })
    )
  }

  getById(id: number): Observable<Membership> {
    return this.http.get<ApiResponse<Membership>>(`${this.baseUrl}/${id}`).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data
        } else {
          throw new Error(response.msg)
        }
      })
    )
  }

  create(membership: Partial<Membership>): Observable<Membership> {
    return this.http.post<ApiResponse<Membership>>(this.baseUrl, membership).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data
        } else {
          throw new Error(response.msg)
        }
      })
    )
  }

  update(id: number, membership: Partial<Membership>): Observable<Membership> {
    return this.http.put<ApiResponse<Membership>>(`${this.baseUrl}/${id}`, membership).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data
        } else {
          throw new Error(response.msg)
        }
      })
    )
  }

  delete(id: number): Observable<{ id: number }> {
    return this.http.delete<ApiResponse<{ id: number }>>(`${this.baseUrl}/${id}`).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data
        } else {
          throw new Error(response.msg)
        }
      })
    )
  }
}
