import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// import { provideHttpClient } from '@angular/common/http';
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyCzTRr-per6InoGGY4EMOEMzK8E2gOX53g",
  authDomain: "testauth-293c3.firebaseapp.com",
  projectId: "testauth-293c3",
  storageBucket: "testauth-293c3.appspot.com",
  messagingSenderId: "977934146477",
  appId: "1:977934146477:web:5c0b60f158fe3f0e625f24",
  measurementId: "G-X86JPMQNDX"
};

initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withHashLocation()),
  importProvidersFrom(
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ) ]
};
