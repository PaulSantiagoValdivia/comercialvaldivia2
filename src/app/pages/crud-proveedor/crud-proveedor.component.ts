import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { BaseController } from '../../basecontroller';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../models/proveedor.model';
import { CrearPersonaComponent } from '../crud-persona/crear-persona/crear-persona.component';
import { CrearProveedorComponent } from './crear-proveedor/crear-proveedor.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-crud-proveedor',
  standalone: true,
  imports: [CommonModule, SidebarComponent,CrearProveedorComponent,ButtonModule,
    FormsModule,TableModule,BadgeModule,InputTextModule

  ],
  templateUrl: './crud-proveedor.component.html',
  styleUrl: './crud-proveedor.component.css'
})
export class CrudProveedorComponent extends BaseController{
  list?:Proveedor[]=[];
  filter_text:string="";
  @ViewChild('modalNuevo') modalNuevo!:CrearProveedorComponent;
  //@ViewChild('modalModifica') modalModifica!:ModificarRolComponent;
  constructor(httpClient:HttpClient,private service:ProveedorService){
    super(httpClient);
    this.recargarLista_();
  }

  async recargarLista(page:any){

  }
  async recargarLista_(){
   // this.recargarLista(this.current_page);
    try{
        this.showLoader();
        this.list=await this.service.getList();
        console.log("list: ",this.list);
        this.hideLoader();
        this.filtrar();
    }catch(err){
      this.hideLoader();
      console.log(err);
      this.showError("Ups.","Ocurrio un error al listar");
    }
  }
  filtrar(){
    // let list:Rol[]=[];
    // if(!this.list)return;
    // for(let l of this.list){
    //   if(l.nombre && l.nombre.toLowerCase().includes(this.filter_text.toLowerCase())){
    //     list.push(l);
    //   }
    // }
    // this.list=list;
  }
  getList():any{
    return this.list;
  }
  onNuevoSave(event:any){
    this.recargarLista_()
  }
  clickNuevo(){
    this.modalNuevo.inicializar(true,{creado:null},1,2);
  }
  clickEditar(data:Proveedor,type=2){
    this.modalNuevo.inicializar(true,data,type,2);
  }
  async clickEliminar(data:Proveedor){
    try{
      this.showLoader();
    await this.service.delete(data.key,false);
    this.hideLoader();
    this.recargarLista_();
    this.showToastSuccess("Eliminado correctamente");
    }catch(err){
      this.hideLoader();
    }
  }
  onModificaSave(data:any){
    console.log("Recibido");
    console.log(data);
    this.recargarLista_();
  }
}
