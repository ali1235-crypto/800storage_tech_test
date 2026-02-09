import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';

interface CacheValue {
  response: HttpResponse<any>;
  expiry: number;
}

const cache = new Map<string, CacheValue>();
const CACHE_DURATION_MS = 5 * 60 * 1000;

export const cacheInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') {
    return next(req);
  }

  const cached = cache.get(req.urlWithParams);
  const now = Date.now();

  if (cached && cached.expiry > now) {
    return of(cached.response.clone());
  } else if (cached) {
    cache.delete(req.urlWithParams);
  }

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        cache.set(req.urlWithParams, {
          response: event.clone(),
          expiry: now + CACHE_DURATION_MS
        });
      }
    })
  );
};
