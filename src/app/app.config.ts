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

// const firebaseConfig = {
//   apiKey: "AIzaSyCzTRr-per6InoGGY4EMOEMzK8E2gOX53g",
//   authDomain: "testauth-293c3.firebaseapp.com",
//   projectId: "testauth-293c3",
//   storageBucket: "testauth-293c3.appspot.com",
//   messagingSenderId: "977934146477",
//   appId: "1:977934146477:web:5c0b60f158fe3f0e625f24",
//   measurementId: "G-X86JPMQNDX"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDbWH-Nxg2FuR9H1-yk7rjEVY6_XwG9juw",
  authDomain: "test-cbntrade.firebaseapp.com",
  projectId: "test-cbntrade",
  storageBucket: "test-cbntrade.appspot.com",
  messagingSenderId: "164556829628",
  appId: "1:164556829628:web:91ce830488533ef4afb1b9",
  measurementId: "G-H7B0ECN420"
};
function obtenerFireBaseConfig(){
  return firebaseConfig;
}
console.log("INICIALIZANDO");
let _app=initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withHashLocation()),
  importProvidersFrom(
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"test-cbntrade","appId":"1:164556829628:web:91ce830488533ef4afb1b9","storageBucket":"test-cbntrade.appspot.com","apiKey":"AIzaSyDbWH-Nxg2FuR9H1-yk7rjEVY6_XwG9juw","authDomain":"test-cbntrade.firebaseapp.com","messagingSenderId":"164556829628","measurementId":"G-H7B0ECN420"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())) ]

};


