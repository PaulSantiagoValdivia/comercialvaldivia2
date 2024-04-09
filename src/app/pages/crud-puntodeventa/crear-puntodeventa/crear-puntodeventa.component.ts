import { Component, ViewChild } from '@angular/core';
import { BuscarTerritorioComponent } from '../../crud-territorio/buscar-territorio/buscar-territorio.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ModalBaseController } from '../../../modalbasecontroller';
import { PuntoDeVenta } from '../../../models/punto_de_venta';
import { PuntoDeVentaService } from '../../../services/punto_de_venta.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-puntodeventa',
  standalone: true,
  imports: [ButtonModule,CommonModule,FormsModule,DialogModule,
    InputSwitchModule,
    InputGroupModule,InputTextModule,InputNumberModule,BuscarTerritorioComponent],
  templateUrl: './crear-puntodeventa.component.html',
  styleUrl: './crear-puntodeventa.component.css'
})
export class CrearPuntodeventaComponent  extends ModalBaseController{
  obj:PuntoDeVenta;
  type:any;//tipo 1 es nuevo, 2=modifica 3consulta
  @ViewChild('modalBuscarTerritorio') modalBuscarTerritorio!:BuscarTerritorioComponent;
  constructor(httpclient:HttpClient,private service:PuntoDeVentaService){
    super(httpclient);
    this.obj={creado:null};
    this.init();
  }
  async init(){

  }
  inicializar(mostrar=true,obj:PuntoDeVenta={creado:null},type=1){
    this.obj=obj;
    console.log("inicializar:",this.obj);
    this.ver=mostrar;
    this.type=type;
  }
  async save(){

    try{


    if(this.type==1){
      return await this.guardar();
    }else if(this.type==2){
      return await this.modificar();
    }
    return true;
    }catch(er){
      return false;
    }
  }
  async guardar(){
    if(!this.validar())return false;
    //alert('asf')
    this.showLoader();
    try{
      console.log("Guardar: ",this.obj);
    let key=await this.service.create(this.obj);
      this.obj.key=key;
    this.hideLoader();
    this.onSave.emit(this.obj);
    this.showToastSuccess("Guardado correctamente");
    this.ocultar();
      return true;
    }catch(error){
      this.showError("Ups","Ocurrio un problema, disculpas por favor.");
      console.log(error);
      this.hideLoader();
      return false;
    }
  }
  async modificar(){
    if(!this.validar())return false;
    this.showLoader();
    try{
      console.log("Modificar: ",this.obj);
    let r=await this.service.update(this.obj);
    this.hideLoader();
    this.onSave.emit(this.obj);
    this.showToastSuccess("Modificado correctamente");
    this.ocultar();
      return true;
    }catch(error){
      this.showError("Ups","Ocurrio un problema, disculpas por favor.");
      console.log(error);
      this.hideLoader();
      return false;
    }
  }
  validar(){
    if(this.obj.codigo=="" || this.obj.codigo==null){
      this.showToastError("Codigo vacio, verifique los datos");
      return false;
    }
    if(this.obj.nombre=="" || this.obj.nombre==null){
      this.showToastError("Nombre vacio, verifique los datos");
      return false;
    }
    if(this.obj.telefono=="" || this.obj.telefono==null){

      this.showToastError("Telefono vacio, verifique los datos");
      return false;
    }
    if(this.obj.domicilio=="" || this.obj.domicilio==null){

      this.showToastError("Domicilio vacio, verifique los datos");
      return false;
    }
    if(this.obj.nombre_fantasia=="" || this.obj.nombre_fantasia==null){

      //this.showToastError("Sub canal vacio, verifique los datos");
      //return false;
    }
    if(this.obj.sub_canal=="" || this.obj.sub_canal==null){
      this.showToastError("Sub canal vacio, verifique los datos");
      return false;
    }
    if(this.obj.dia_visita=="" || this.obj.dia_visita==null){
      this.showToastError("Dia visita no seleccionado, verifique los datos");
      return false;
    }
    if(this.obj.key_territorio=="" || this.obj.key_territorio==null){
      this.showToastError("Sin Territorio seleccionado, verifique los datos");
      return false;
    }
    return true;
  }
  onSelectedTerritorio(event:any){
    console.log("onSelectedTerritorio:",event);
    this.obj.territorio=event;
    this.obj.key_territorio=event.key;
  }
  abrirTerritorio(){
    this.modalBuscarTerritorio.inicializar(true);
  }
}



