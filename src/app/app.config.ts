import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// import { provideHttpClient } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { initializeApp as initializeApp_alias, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'

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
  providers: [provideRouter(routes, withHashLocation()),
  importProvidersFrom(
    HttpClientModule,
    AngularFirestoreModule
<<<<<<< HEAD
  ), importProvidersFrom(provideFirebaseApp(() => initializeApp(firebaseConfig))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())) ]
=======
  ), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"test-cbntrade","appId":"1:164556829628:web:91ce830488533ef4afb1b9","storageBucket":"test-cbntrade.appspot.com","apiKey":"AIzaSyDbWH-Nxg2FuR9H1-yk7rjEVY6_XwG9juw","authDomain":"test-cbntrade.firebaseapp.com","messagingSenderId":"164556829628","measurementId":"G-H7B0ECN420"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())) ]

>>>>>>> master
};
