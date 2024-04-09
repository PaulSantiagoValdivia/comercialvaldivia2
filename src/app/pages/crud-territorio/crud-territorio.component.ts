import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrearTerritorioComponent } from './crear-territorio/crear-territorio.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { BaseController } from '../../basecontroller';
import { Territorio } from '../../models/territorio.model';
import { HttpClient } from '@angular/common/http';
import { TerritorioService } from '../../services/territorio.service';

@Component({
  selector: 'app-crud-territorio',
  standalone: true,
  imports: [FormsModule,CrearTerritorioComponent,TableModule,
    ButtonModule,BadgeModule,CommonModule,SidebarComponent],
  templateUrl: './crud-territorio.component.html',
  styleUrl: './crud-territorio.component.css'
})
export class CrudTerritorioComponent extends BaseController{
  list:Territorio[]=[];
  filter_text:string="";
  @ViewChild('modalNuevo') modalNuevo!:CrearTerritorioComponent;
  constructor(httpClient:HttpClient,private service:TerritorioService){
    super(httpClient);
    this.recargarLista_();
  }
  async recargarLista_(){
     try{
         this.showLoader();
         this.list=await this.service.getList(true,true,true);
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
    if(!this.filter_text)return;
     let list:Territorio[]=[];
     if(!this.list)return;
     for(let l of this.list){
      if(l.codigo && l.codigo.toLowerCase().includes(this.filter_text.toLowerCase())){
        list.push(l);
      }
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
  clickEditar(data:Territorio,type=2){
    console.log("clickEditar: ",data);
    this.modalNuevo.inicializar(true,data,type);
  }
  async clickEliminar(data:Territorio){
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

