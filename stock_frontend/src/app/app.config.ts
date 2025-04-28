import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { NotificationInterceptor } from './shared/components/toast/interceptor/NotificationInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(),
    //{ provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true }
  ]
};
