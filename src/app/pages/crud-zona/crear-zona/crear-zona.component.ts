import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { BuscarSubregionComponent } from '../../crud-subregion/buscar-subregion/buscar-subregion.component';
import { Zona } from '../../../models/zona.model';
import { ModalBaseController } from '../../../modalbasecontroller';
import { HttpClient } from '@angular/common/http';
import { ZonaService } from '../../../services/zona.service';

@Component({
  selector: 'app-crear-zona',
  standalone: true,
  imports: [ButtonModule,CommonModule,FormsModule,DialogModule,
    InputSwitchModule,
    InputGroupModule,InputTextModule,InputNumberModule,BuscarSubregionComponent],
  templateUrl: './crear-zona.component.html',
  styleUrl: './crear-zona.component.css'
})
export class CrearZonaComponent extends ModalBaseController{
  obj:Zona;
  type:any;//tipo 1 es nuevo, 2=modifica 3consulta
  @ViewChild('modalBuscarSubRegion') modalBuscarSubRegion!:BuscarSubregionComponent;
  constructor(httpclient:HttpClient,private service:ZonaService){
    super(httpclient);
    this.obj={creado:null};
    this.init();
  }
  async init(){

  }
  inicializar(mostrar=true,obj:Zona={creado:null},type=1){
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
    //Swal.
    //this.messageService.add({severity: 'success', summary:  'Guardado', detail: 'Correcto.' });
    this.ocultar();
      return true;

    //alert("Guardando correctamente");
    }catch(error){
      this.showError("Ups","Ocurrio un problema, disculpas por favor.");
      console.log(error);
      this.hideLoader();
      return false;
    }
  }
  async modificar(){
    //alert('asf')
    if(!this.validar())return false;
    this.showLoader();
    try{
      console.log("Modificar: ",this.obj);
    let r=await this.service.update(this.obj);
     // this.obj.key=key;
    this.hideLoader();
    this.onSave.emit(this.obj);
    this.showToastSuccess("Modificado correctamente");
    //Swal.
    //this.messageService.add({severity: 'success', summary:  'Guardado', detail: 'Correcto.' });
    this.ocultar();

      return true;
    //alert("Guardando correctamente");
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
    if(this.obj.key_subregion=="" || this.obj.key_subregion==null){
      this.showToastError("Sin Subregion seleccionado, verifique los datos");
      return false;
    }
    return true;
  }
  onSelectedSubRegion(event:any){
    console.log("onSelectedSubRegion:",event);
    this.obj.subregion=event;
    this.obj.key_subregion=event.key;
  }
  abrirSubRegion(){
    this.modalBuscarSubRegion.inicializar(true);
  }
}



