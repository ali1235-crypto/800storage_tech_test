import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorInterceptor } from './interceptors/auth-interceptor-interceptor';
import { cacheInterceptorInterceptor } from './interceptors/cache-interceptor-interceptor';
import { loadingInterceptorInterceptor } from './interceptors/loading-interceptor-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptorInterceptor,cacheInterceptorInterceptor,loadingInterceptorInterceptor]) 
    )
  ]
};
