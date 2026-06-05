import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();
  const toast = inject(ToastService);
  const router = inject(Router);
  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if(err.status === 401 && !req.url.includes('/login')){
        toast.error('Your session has expired or jwt is invalid. Please login in again');
        setTimeout(() =>{
          auth.logout();
          router.navigate(['/login']);
        }, 2000);
      }
      return throwError(() => err);
    }),
  );
};
