import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrearPuntodeventaComponent } from './crear-puntodeventa/crear-puntodeventa.component';
import { TableModule } from 'primeng/table';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { PuntoDeVenta } from '../../models/punto_de_venta';
import { PuntoDeVentaService } from '../../services/punto_de_venta.service';
import { BaseController } from '../../basecontroller';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crud-puntodeventa',
  standalone: true,
  imports: [FormsModule,CrearPuntodeventaComponent,TableModule,
    ButtonModule,BadgeModule,CommonModule,SidebarComponent],
  templateUrl: './crud-puntodeventa.component.html',
  styleUrl: './crud-puntodeventa.component.css'
})
export class CrudPuntodeventaComponent extends BaseController{
  list:PuntoDeVenta[]=[];
  filter_text:string="";
  @ViewChild('modalNuevo') modalNuevo!:CrearPuntodeventaComponent;
  constructor(httpClient:HttpClient,private service:PuntoDeVentaService){
    super(httpClient);
    this.recargarLista_();
  }
  async recargarLista_(){
     try{
         this.showLoader();
         this.list=await this.service.getList(true,true,true,true);
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
     let list:PuntoDeVenta[]=[];
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
  clickEditar(data:PuntoDeVenta,type=2){
    console.log("clickEditar: ",data);
    this.modalNuevo.inicializar(true,data,type);
  }
  async clickEliminar(data:PuntoDeVenta){
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

