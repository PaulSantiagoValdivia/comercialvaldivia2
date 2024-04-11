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
  apiKey: "AIzaSyA7To-Oo1GkokTjnzO13rDVX79dj9H3G6s",
  authDomain: "fireabase-7aaef.firebaseapp.com",
  projectId: "fireabase-7aaef",
  storageBucket: "fireabase-7aaef.appspot.com",
  messagingSenderId: "356563077766",
  appId: "1:356563077766:web:6c60ad9920bed0ef6e1f07",
  measurementId: "G-YM9VHPKFFJ"
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
