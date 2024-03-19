import { Component, ViewChild } from '@angular/core';
import { BaseController } from '../../basecontroller';
import { Permiso, Rol } from '../../models/rol.model';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CrearRolComponent } from './crear-rol/crear-rol.component';
import { HttpClient } from '@angular/common/http';
import { RolService } from '../../services/rol.service';
import { ModificarRolComponent } from './modificar-rol/modificar-rol.component';
import { BadgeModule } from 'primeng/badge';
@Component({
  selector: 'app-crud-roles',
  standalone: true,
  imports: [ButtonModule,TableModule,InputTextModule,BadgeModule,
    CommonModule,FormsModule,SidebarComponent,CrearRolComponent,ModificarRolComponent],
  templateUrl: './crud-roles.component.html',
  styleUrl: './crud-roles.component.css'
})
export class CrudRolesComponent extends BaseController{
  list?:Rol[]=[];
  filter_text:string="";
  @ViewChild('modalNuevo') modalNuevo!:CrearRolComponent;
  @ViewChild('modalModifica') modalModifica!:ModificarRolComponent;
  constructor(httpClient:HttpClient,private rolService:RolService){
    super(httpClient);
    this.recargarLista_();
  }

  async recargarLista(page:any){

  }
  async recargarLista_(){
   // this.recargarLista(this.current_page);
    try{
        this.showLoader();
        this.list=await this.rolService.getList2();
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
    let list:Rol[]=[];
    if(!this.list)return;
    for(let l of this.list){
      if(l.nombre && l.nombre.toLowerCase().includes(this.filter_text.toLowerCase())){
        list.push(l);
      }
    }
    this.list=list;
  }
  getList():any{
    return this.list;
  }
  onNuevoSave(event:any){
    this.recargarLista_()
  }
  clickNuevo(){
    this.modalNuevo.inicializar();
  }
  clickEditar(data:Rol,type=2){
    this.modalNuevo.inicializar(true,data,type);
  }
  async clickEliminar(data:Rol){
    try{
      this.showLoader();
    await this.rolService.delete(data.key,false);
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
