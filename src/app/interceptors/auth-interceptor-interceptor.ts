import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = 'reqres_0b7fff4387484eb08f20865641a9be23'; 

  const authReq = req.clone({
    setHeaders: {
      'x-api-key': authToken
    }
  });

  return next(authReq);
};
