import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const reqWithHeader = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${import.meta.env.NG_APP_TOKEN}`),
  });

  return next(reqWithHeader).pipe(
    tap((event) => {
      console.log(event);
    }),
    catchError((error: HttpResponse<unknown>) => {
      console.log(error)
      return of(error);
    })
  );
};
