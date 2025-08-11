import { HttpInterceptorFn } from '@angular/common/http';

import { AuthTokenService } from '../services/AuthToken/auth-token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = new AuthTokenService();

   const token = tokenService.getToken();

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
   
    return next(authReq);
  }
  

  return next(req);
};
