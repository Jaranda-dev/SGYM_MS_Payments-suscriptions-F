import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('🔍 Interceptor ejecutándose para:', req.url);
  
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    console.log('✅ Token agregado a la petición');
    return next(authReq);
  }
  
  console.log('❌ No hay token disponible');
  return next(req);
};
