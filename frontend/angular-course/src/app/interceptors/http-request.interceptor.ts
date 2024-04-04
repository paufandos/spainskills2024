import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  req = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  let errorMessage = 'Se ha producido un error';
  return next(req).pipe(
    catchError((error: any) => {
      toastService.show();
      return throwError(error);
    })
  )
};
