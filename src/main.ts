import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { Routes, provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppService } from './app/services/app.service';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { AuthGuard } from './app/services/auth.guard'
import { InterceptorService } from './app/services/interceptor.service';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', data: { preload: true }, loadComponent: () => import('./app/pages/login/login.component').then( r => r.LoginComponent) },
  {
    path: 'default', 
    loadChildren: () => import('./app/layout/default/default.route') ,canActivate: [AuthGuard]
    
  }
  ,{ path: '**', redirectTo: 'login' }
];

const initializerConfigFn = (appService: AppService) => {
  return () => {
    return appService.loadConfig();
  };
};

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initializerConfigFn,
      multi: true,
      deps: [AppService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
}).catch((err) => console.error(err));
