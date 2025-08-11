import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { map, catchError, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const page = route.data['page'] as string;

    return this.authService.hasPermission(page).pipe(
      map((response) => {
        // Si tiene permiso, dejar pasar
        return true;
      }),
      catchError((error) => {
        // Si no tiene permiso o hay error, redirigir
        return of(this.router.parseUrl('/federation-login'));
      })
    );
  }
}
