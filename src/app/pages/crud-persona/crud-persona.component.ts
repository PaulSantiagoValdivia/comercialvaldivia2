import { Component, Injectable, NgModule, OnInit, ViewChild, inject } from '@angular/core';
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
import { QueryDocumentSnapshot, setDoc } from '@firebase/firestore';
import { CrearPersonaComponent } from './crear-persona/crear-persona.component';
import { ModificaPersonaComponent } from './modifica-persona/modifica-persona.component';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
//import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
@Component({
  standalone: true,
  selector: 'app-crud-persona',
  templateUrl: './crud-persona.component.html',
  styleUrl: './crud-persona.component.css',
  imports: [ /*FormsModule,*/ CommonModule, SidebarComponent,
  CrearPersonaComponent,ModificaPersonaComponent,PaginatorModule,TableModule,ButtonModule,
  BadgeModule
],
  providers: [PersonaService],
})
@Injectable({
  providedIn: 'root'
})
export class CrudPersona extends BaseController{
  @ViewChild('modalNuevo') modalNuevo!:CrearPersonaComponent;
  @ViewChild('modalModifica') modalModifica!:ModificaPersonaComponent;
//   public list=[{
//     nombre:"Proveedor SRL",
//     key_persona:"AS12154654",
//     persona:{nombre:"Juan",ci:"123",celular:788412,correo:"juan@gmail",
//     region:"Santa cruz",fecha_registro:new Date(),nro_colaboradores:10}
//   },
//   {
//     nombre:"Proveedor SRL2",
//     key_persona:"AS12154654",
//     persona:{nombre:"Carlos",ci:"123",celular:788412,correo:"Carlos@gmail",
//     region:"Santa cruz",fecha_registro:new Date(),nro_colaboradores:7}
//   },
//   {
//     nombre:"Proveedor SRL2",
//     key_persona:"AS12154654",
//     persona:{nombre:"Carlos",ci:"123",celular:788412,correo:"Carlos@gmail",
//     region:"Santa cruz",fecha_registro:new Date(),nro_colaboradores:7}
//   },
//   {
//     nombre:"Proveedor SRL2",
//     key_persona:"AS12154654",
//     persona:{nombre:"Carlos",ci:"123",celular:788412,correo:"Carlos@gmail",
//     region:"Santa cruz",fecha_registro:new Date(),nro_colaboradores:7}
//   },
//   {
//     nombre:"Proveedor SRL2",
//     key_persona:"AS12154654",
//     persona:{nombre:"Carlos",ci:"123",celular:788412,correo:"Carlos@gmail",
//     region:"Santa cruz",fecha_registro:new Date(),nro_colaboradores:7}
//   }
// ]
  list:any=[];
   size_page=7;
   total_register=0;
   current_page=0;
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


      // this.showLoader();
      // setTimeout(()=>{
      //   this.hideLoader()
      // },50);


    }

    async inicializar(){
      // await this.personaService.createRobot("robot","rojo","20");
      this.recargarLista_();
    }
    async recargarLista(page:any){
      this.current_page=page;
      this.list=[];
      try{
      this.showLoader();
      let data=await this.personaService.getListPaginate(this.current_page,this.size_page);
      console.log("lista conseguida");
      console.log(data);
      this.list=data.data;
      this.total_register=data.total_register;
      this.hideLoader();
      }catch(error){
        console.log(error);
        alert("Ups ocurrio un error al traer lista")
        this.hideLoader();
      }
    }
    //trae y recarga la lista
    async recargarLista_(){
      this.recargarLista(this.current_page);

      // this.list=[];
      // try{
      //   this.showLoader();
      // let data=await this.personaService.getList();
      // console.log("lista conseguida");
      // console.log(data);
      // data.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      //   this.list.push(doc);
      // });
      // this.hideLoader();
      // }catch(error){
      //   console.log(error);
      //   this.hideLoader();
      // }
    }
    //esta funcion es para abrir y limpiar el modal
    inicializarNuevoRegistro(){
      this.modalNuevo.mostrar();
      this.modalNuevo.inicializarNuevo();
    }
    //es la funcion donde recibira el evento del MODAL NUEVO al guardar
    onNuevoSave(data:any){
      console.log("Recibido");
      console.log(data);
      this.recargarLista_();
    }
    onModificaSave(data:any){
      console.log("Recibido");
      console.log(data);
      this.recargarLista_();
    }
    clickEditar(doc:QueryDocumentSnapshot,isconsult=false){
      this.modalModifica.mostrar();
      this.modalModifica.isConsulta=isconsult;
      this.modalModifica.inicializarNuevo(doc.data(),doc.id);

      //doc.
      //doc.update({lastName:"Test"})
      //setDoc(doc, { capital: true });
      // doc.doc().update({
      //   "Availability": "test",
      // });
    }

    onPageChange(event:any){
      this.current_page=event.page;
      this.size_page=event.rows;
      this.recargarLista_();
    }


}
