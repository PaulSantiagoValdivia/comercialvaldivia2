import { Component, ViewChild } from '@angular/core';
import { BaseController } from '../../basecontroller';
import { Region } from '../../models/region.model';
import { CrearRegionComponent } from './crear-region/crear-region.component';
import { HttpClient } from '@angular/common/http';
import { RegionService } from '../../services/region.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-crud-region',
  standalone: true,
  imports: [CommonModule, SidebarComponent,CrearRegionComponent,ButtonModule,
    FormsModule,TableModule,BadgeModule,InputTextModule],
  templateUrl: './crud-region.component.html',
  styleUrl: './crud-region.component.css'
})
export class CrudRegionComponent extends BaseController{
  list?:Region[]=[];
  filter_text:string="";
  @ViewChild('modalNuevo') modalNuevo!:CrearRegionComponent;
  constructor(httpClient:HttpClient,private service:RegionService){
    super(httpClient);
    this.recargarLista_();
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
     let list:Region[]=[];
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
    console.log("onNnuevoSave event:",event);
    this.recargarLista_()
  }
  clickNuevo(){
    this.modalNuevo.inicializar(true,{creado:null},1);
  }
  clickEditar(data:Region,type=2){
    console.log("clickEditar: ",data);
    this.modalNuevo.inicializar(true,data,type);
  }
  async clickEliminar(data:Region){
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
