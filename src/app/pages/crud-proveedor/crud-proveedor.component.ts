import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { BaseController } from '../../basecontroller';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-crud-proveedor',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './crud-proveedor.component.html',
  styleUrl: './crud-proveedor.component.css'
})
export class CrudProveedorComponent extends BaseController{

  list:any=[];
   constructor(private router: Router,httpClient: HttpClient,private authService: AuthService
    ,private proveedorService:ProveedorService
    ){
      super(httpClient);
      this.inicializar();
    }
   async recargarLista(page:any){
    this.current_page=page;
    this.list=[];
    try{
      this.showLoader();
    let data=await this.proveedorService.getList();
    console.log("lista conseguidaasdasd");
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
  async inicializar(){
    // await this.personaService.createRobot("robot","rojo","20");
    this.recargarLista_();
  }
   async recargarLista_(){
    this.recargarLista(this.current_page);
  }
   clickEditar(doc:QueryDocumentSnapshot,isconsult=false){
    // this.modalModifica.mostrar();
    // this.modalModifica.isConsulta=isconsult;
    // this.modalModifica.inicializarNuevo(doc.data(),doc.id);
  }
  inicializarNuevoRegistro(){
    // this.modalNuevo.mostrar();
    // this.modalNuevo.inicializarNuevo();
  }

  onPageChange(event:any){
    this.current_page=event.page;
    this.size_page=event.rows;
    //this.recargarLista_();
  }
}
