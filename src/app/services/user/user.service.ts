import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../interfaces/user';
import { ApiResponse } from '../../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<ApiResponse<User[]>>(`${environment.apiNG}/users`).pipe(
      map(response => response.data)
    );
  }

  getById(id: string): Observable<User> {
    return this.http.get<ApiResponse<User>>(`${environment.apiNG}/users/${id}`).pipe(
      map(response => response.data)
    );
  }

  create(user: User): Observable<User> {
    return this.http.post<ApiResponse<User>>(`${environment.apiNG}/users`, user).pipe(
      map(response => response.data)
    );
  }

  update(id: string, user: User): Observable<User> {
    return this.http.put<ApiResponse<User>>(`${environment.apiNG}/users/${id}`, user).pipe(
      map(response => response.data)
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${environment.apiNG}/users/${id}`).pipe(
      map(response => response.data)
    );
  }
}
