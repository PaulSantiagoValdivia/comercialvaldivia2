import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// import { provideHttpClient } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { initializeApp as initializeApp_alias, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { provideAnimations } from '@angular/platform-browser/animations';

    const firebaseConfig = {
        projectId: "test-cbntrade",
        appId: "1:164556829628:web:91ce830488533ef4afb1b9",
        storageBucket: "test-cbntrade.appspot.com",
        apiKey: "AIzaSyDbWH-Nxg2FuR9H1-yk7rjEVY6_XwG9juw",
        authDomain: "test-cbntrade.firebaseapp.com",
        messagingSenderId: "164556829628",
        measurementId: "G-H7B0ECN420"
      };

initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideAnimations(),//esto es para arreglar browseranimation module
  importProvidersFrom(
    HttpClientModule,
    AngularFirestoreModule
  ), importProvidersFrom(provideFirebaseApp(() => initializeApp(firebaseConfig))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())) ]
};
