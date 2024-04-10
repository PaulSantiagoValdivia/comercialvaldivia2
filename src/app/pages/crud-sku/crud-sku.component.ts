import { Component, ViewChild } from '@angular/core';
import { BaseController } from '../../basecontroller';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { Sku } from '../../models/sku.model';
import { CrearSkuComponent } from './crear-sku/crear-sku.component';
import { SkuService } from '../../services/sku.service';
@Component({
  selector: 'app-crud-sku',
  standalone: true,
  imports: [CommonModule,ButtonModule,FormsModule,TableModule,BadgeModule,InputTextModule,CrearSkuComponent],
  templateUrl: './crud-sku.component.html',
  styleUrl: './crud-sku.component.css'
})
export class CrudSkuComponent extends BaseController{
  list?:Sku[]=[];
  filter_text:string="";
  @ViewChild('modalNuevo') modalNuevo!:CrearSkuComponent;
  constructor(httpClient:HttpClient,private service:SkuService){
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
     let list:Sku[]=[];
     if(!this.list)return;
     for(let l of this.list){
       if(l.sku && l.sku.toLowerCase().includes(this.filter_text.toLowerCase())){
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
  clickEditar(data:Sku,type=2){
    console.log("clickEditar: ",data);
    this.modalNuevo.inicializar(true,data,type);
  }
  async clickEliminar(data:Sku){
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


