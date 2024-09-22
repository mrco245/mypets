import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthService } from './shared/services/auth.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [ AuthService, provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), 
    { provide: FIREBASE_OPTIONS, useValue: {"projectId":"mypets-40d8d","appId":"1:892940366473:web:ca6768aedaf494cdf58c58","storageBucket":"mypets-40d8d.appspot.com","apiKey":"AIzaSyBnsjYsz8KN2RvtlYmVGUwof_I6Ni2XUBU","authDomain":"mypets-40d8d.firebaseapp.com","messagingSenderId":"892940366473","measurementId":"G-0XG969HLNF"}}, provideAnimationsAsync(), provideNativeDateAdapter(),]
};
