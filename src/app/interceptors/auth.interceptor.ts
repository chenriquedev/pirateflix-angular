import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { ToastService } from '../service/toast.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const reqWithHeader = req.clone({
    headers: req.headers.set(
      'Authorization',
      `Bearer ${import.meta.env.NG_APP_TOKEN}`
    ),
  });

  return next(reqWithHeader).pipe(
    tap((event) => {
      return event;
    }),
    catchError((error: HttpResponse<unknown>) => {
      toastService.showToast(
        'error',
        'Erro',
        error.statusText || 'Ocorreu um erro'
      );
      console.log(error);
      return of(error);
    })
  );
};
