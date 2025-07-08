import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptor } from './interceptor/jwt-interceptor';

export function tokenGetter() {
  return sessionStorage.getItem('token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),provideAnimationsAsync(), provideCharts(withDefaultRegisterables()),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['https://uwork4.azurewebsites.net'],
          disallowedRoutes: ['https://uwork4.azurewebsites.net/login/forget'],
        },
      })
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    } 
  ]
};
