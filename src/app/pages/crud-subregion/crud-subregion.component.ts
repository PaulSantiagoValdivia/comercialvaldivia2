import { Component, ViewChild } from '@angular/core';
import { BaseController } from '../../basecontroller';
import { SubRegion } from '../../models/subregion.model';
import { CrearSubregionComponent } from './crear-subregion/crear-subregion.component';
import { SubRegionService } from '../../services/subregion.service';
import { HttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud-subregion',
  standalone: true,
  imports: [FormsModule,CrearSubregionComponent,TableModule,ButtonModule,BadgeModule,CommonModule,SidebarComponent],
  templateUrl: './crud-subregion.component.html',
  styleUrl: './crud-subregion.component.css'
})
export class CrudSubregionComponent extends BaseController{
  list?:SubRegion[]=[];
  filter_text:string="";
  @ViewChild('modalNuevo') modalNuevo!:CrearSubregionComponent;
  constructor(httpClient:HttpClient,private service:SubRegionService){
    super(httpClient);
    this.recargarLista_();
  }
  async recargarLista_(){
    // this.recargarLista(this.current_page);
     try{
         this.showLoader();
         this.list=await this.service.getList(true);
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
     let list:SubRegion[]=[];
     if(!this.list)return;
     for(let l of this.list){
       if(l.nombre && l.nombre.toLowerCase().includes(this.filter_text.toLowerCase())){
         list.push(l);
       }else if(l.region?.nombre?.toLocaleLowerCase().includes(this.filter_text.toLowerCase())){
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
  clickEditar(data:SubRegion,type=2){
    console.log("clickEditar: ",data);
    this.modalNuevo.inicializar(true,data,type);
  }
  async clickEliminar(data:SubRegion){
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
