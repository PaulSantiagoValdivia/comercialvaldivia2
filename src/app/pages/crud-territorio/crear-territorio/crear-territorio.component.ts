import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { BuscarZonaComponent } from '../../crud-zona/buscar-zona/buscar-zona.component';
import { ModalBaseController } from '../../../modalbasecontroller';
import { Territorio } from '../../../models/territorio.model';
import { HttpClient } from '@angular/common/http';
import { TerritorioService } from '../../../services/territorio.service';

@Component({
  selector: 'app-crear-territorio',
  standalone: true,
  imports: [ButtonModule,CommonModule,FormsModule,DialogModule,
    InputSwitchModule,
    InputGroupModule,InputTextModule,InputNumberModule,BuscarZonaComponent],
  templateUrl: './crear-territorio.component.html',
  styleUrl: './crear-territorio.component.css'
})
export class CrearTerritorioComponent extends ModalBaseController{
  obj:Territorio;
  type:any;//tipo 1 es nuevo, 2=modifica 3consulta
  @ViewChild('modalBuscarZona') modalBuscarZona!:BuscarZonaComponent;
  constructor(httpclient:HttpClient,private service:TerritorioService){
    super(httpclient);
    this.obj={creado:null};
    this.init();
  }
  async init(){

  }
  inicializar(mostrar=true,obj:Territorio={creado:null},type=1){
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
    if(this.obj.key_zona=="" || this.obj.key_zona==null){
      this.showToastError("Sin Zona seleccionado, verifique los datos");
      return false;
    }
    return true;
  }
  onSelectedZona(event:any){
    console.log("onSelectedZona:",event);
    this.obj.zona=event;
    this.obj.key_zona=event.key;
  }
  abrirZona(){
    this.modalBuscarZona.inicializar(true);
  }
}



