import { Component, ViewChild } from '@angular/core';
import { BaseController } from '../../basecontroller';
import { Zona } from '../../models/zona.model';
import { CrearZonaComponent } from './crear-zona/crear-zona.component';
import { ZonaService } from '../../services/zona.service';
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud-zona',
  standalone: true,
  imports: [FormsModule,CrearZonaComponent,TableModule,
    ButtonModule,BadgeModule,CommonModule,SidebarComponent],
  templateUrl: './crud-zona.component.html',
  styleUrl: './crud-zona.component.css'
})
export class CrudZonaComponent extends BaseController{
  list:Zona[]=[];
  filter_text:string="";
  @ViewChild('modalNuevo') modalNuevo!:CrearZonaComponent;
  constructor(httpClient:HttpClient,private service:ZonaService){
    super(httpClient);
    this.recargarLista_();
  }
  async recargarLista_(){
    // this.recargarLista(this.current_page);
     try{
         this.showLoader();
         this.list=await this.service.getList(true,true);
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
     let list:Zona[]=[];
     if(!this.list)return;
     for(let l of this.list){
       if(l.nombre && l.nombre.toLowerCase().includes(this.filter_text.toLowerCase())){
         list.push(l);
       }
      //  else if(l.region?.nombre?.toLocaleLowerCase().includes(this.filter_text.toLowerCase())){
      //   list.push(l);
      //  }

     }
     this.list=list;
  }
  getList():any{
    return this.list;
  }
  onNuevoSave(event:any){
    console.log("onNnuevoSave event:",event);
    this.recargarLista_()
  }
  clickNuevo(){
    this.modalNuevo.inicializar(true,{creado:null},1);
  }
  clickEditar(data:Zona,type=2){
    console.log("clickEditar: ",data);
    this.modalNuevo.inicializar(true,data,type);
  }
  async clickEliminar(data:Zona){
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
}
