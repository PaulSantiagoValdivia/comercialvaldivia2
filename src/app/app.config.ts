import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';

// import { provideHttpClient } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { initializeApp as initializeApp_alias, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withHashLocation()),
  importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "test-cbntrade", "appId": "1:164556829628:web:91ce830488533ef4afb1b9", "storageBucket": "test-cbntrade.appspot.com", "apiKey": "AIzaSyDbWH-Nxg2FuR9H1-yk7rjEVY6_XwG9juw", "authDomain": "test-cbntrade.firebaseapp.com", "messagingSenderId": "164556829628", "measurementId": "G-H7B0ECN420" }))),
  importProvidersFrom(provideAuth(() => getAuth())),
  importProvidersFrom(provideFirestore(() => getFirestore()))]
};


