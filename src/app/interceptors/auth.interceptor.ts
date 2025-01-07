import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const reqWithHeader = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${import.meta.env.NG_APP_TOKEN}`),
  });

  return next(reqWithHeader).pipe(
    tap((event) => {
      return event
    }),
    catchError((error: HttpResponse<unknown>) => {
      return of(error);
    })
  );
};
