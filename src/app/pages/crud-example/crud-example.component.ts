import { Component, Injectable, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BaseController } from '../../basecontroller';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { AuthService } from '../../../services/auth.service';
//import { collection, doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { FirebaseAppModule, initializeApp } from '@angular/fire/app';
import { Firestore, addDoc,collection, getDocs, query } from '@angular/fire/firestore';
import firebase from "firebase/app";
import "firebase/firestore";
import { appConfig } from '../../app.config';
//import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
@Component({
  standalone: true,
  selector: 'app-crud-example',
  templateUrl: './crud-example.component.html',
  styleUrl: './crud-example.component.css',
  imports: [ FormsModule, CommonModule, SidebarComponent,FirebaseAppModule ],
})
@Injectable({
  providedIn: 'root'
})
export class CrudExampleComponent extends BaseController{

  //firestore: Firestore = inject(Firestore);
    constructor(private router: Router,httpClient: HttpClient,private authService: AuthService

      ){
      super(httpClient);

      //collection(firestore, "persona");
    //    const citiesRef = collection(firestore, "persona");
    // const data=collection(firestore, "");
    // console.log("cities");
    // console.log(citiesRef);
// Initialize Firebase
//const app = initializeApp(this.firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
//const db = getFirestore(appConfig);

// Initialize Firebase
//const app=firebase.initializeApp(this.firebaseConfig);
//const db = getFirestore(app);

// Initialize Cloud Firestore and get a reference to the service
//const db = firebase.firestore();
      // Initialize Firebase
   //  const app = initializeApp(this.firebaseConfig);
    // const db = getFirestore(app);
    // const citiesRef = collection(db, "persona");
    // const data=collection(db, "");
    // console.log("cities");
    // console.log(citiesRef);

    // console.log("data");
    // console.log(data);


// Initialize Cloud Firestore and get a reference to the service

       // console.log(appConfig);


      this.showLoader();
      setTimeout(()=>{
        this.hideLoader()
      },2000);


    }
}
