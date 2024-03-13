import { Component, Injectable, NgModule, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BaseController } from '../../basecontroller';
//import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { AuthService } from '../../../services/auth.service';
//import { collection, doc, setDoc } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";
// import { FirebaseAppModule, initializeApp } from '@angular/fire/app';
// import { Firestore, addDoc,collection, getDocs, query } from '@angular/fire/firestore';
// import firebase from "firebase/app";
// import "firebase/firestore";
// import { appConfig } from '../../app.config';
import { PersonaService } from '../../services/persona.service';
import { Firestore } from '@angular/fire/firestore';
//import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
@Component({
  standalone: true,
  selector: 'app-crud-example',
  templateUrl: './crud-example.component.html',
  styleUrl: './crud-example.component.css',
  imports: [ /*FormsModule,*/ CommonModule, SidebarComponent ],
  providers: [PersonaService],
})
@Injectable({
  providedIn: 'root'
})
export class CrudExampleComponent extends BaseController{

  public list=[{
    nombre:"Proveedor SRL",
    key_persona:"AS12154654",
    persona:{nombre:"Juan",ci:"123",celular:788412,correo:"juan@gmail",
    region:"Santa cruz",fecha_registro:new Date(),nro_colaboradores:10}
  },
  {
    nombre:"Proveedor SRL2",
    key_persona:"AS12154654",
    persona:{nombre:"Carlos",ci:"123",celular:788412,correo:"Carlos@gmail",
    region:"Santa cruz",fecha_registro:new Date(),nro_colaboradores:7}
  },
  {
    nombre:"Proveedor SRL2",
    key_persona:"AS12154654",
    persona:{nombre:"Carlos",ci:"123",celular:788412,correo:"Carlos@gmail",
    region:"Santa cruz",fecha_registro:new Date(),nro_colaboradores:7}
  },
  {
    nombre:"Proveedor SRL2",
    key_persona:"AS12154654",
    persona:{nombre:"Carlos",ci:"123",celular:788412,correo:"Carlos@gmail",
    region:"Santa cruz",fecha_registro:new Date(),nro_colaboradores:7}
  },
  {
    nombre:"Proveedor SRL2",
    key_persona:"AS12154654",
    persona:{nombre:"Carlos",ci:"123",celular:788412,correo:"Carlos@gmail",
    region:"Santa cruz",fecha_registro:new Date(),nro_colaboradores:7}
  }
]

  //firestore: Firestore = inject(Firestore);
    constructor(private router: Router,httpClient: HttpClient,private authService: AuthService
      ,public personaService:PersonaService
      ){
      super(httpClient);
      this.inicializar();

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
      },50);


    }
    async inicializar(){
      await this.personaService.createRobot("robot","rojo","20");
    }
}
