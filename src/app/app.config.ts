import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthService } from './shared/services/auth.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';

const firebaseConfig = {
  projectId: '',
  appId: '',
  storageBucket: '',
  apiKey: '',
  authDomain: '',
  messagingSenderId: '',
  measurementId: '',
};

export const appConfig: ApplicationConfig = {
  providers: [
    AuthService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: FIREBASE_OPTIONS, useValue: {firebaseConfig} },
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
  ],
};
