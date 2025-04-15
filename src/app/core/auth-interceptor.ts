import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Skip auth for modal requests
  if (req.headers.get('X-Modal-Request') === 'true') {
    return next(req);
  }

  const authToken = authService.getAccessToken();
  const authReq = authToken 
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};