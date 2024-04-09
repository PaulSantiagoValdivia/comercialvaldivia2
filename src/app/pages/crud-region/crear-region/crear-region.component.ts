import { Component } from '@angular/core';
import { Region } from '../../../models/region.model';
import { RegionService } from '../../../services/region.service';
import { HttpClient } from '@angular/common/http';
import { ModalBaseController } from '../../../modalbasecontroller';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-crear-region',
  standalone: true,
  imports: [ButtonModule,CommonModule,FormsModule,DialogModule,
    InputSwitchModule,
    InputGroupModule,InputTextModule,InputNumberModule],
  templateUrl: './crear-region.component.html',
  styleUrl: './crear-region.component.css'
})
export class CrearRegionComponent  extends ModalBaseController{
  obj:Region;
  type:any;//tipo 1 es nuevo, 2=modifica 3consulta
  constructor(httpclient:HttpClient,private service:RegionService){
    super(httpclient);
    this.obj={creado:null};
  }
  inicializar(mostrar=true,obj:Region={creado:null},type=1){
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
    return true;
    if(this.obj.codigo=="" || this.obj.codigo==null){
      this.showToastError("Codigo vacio, verifique los datos");
      return false;
    }
    if(this.obj.nombre=="" || this.obj.nombre==null){
      this.showToastError("Codigo vacio, verifique los datos");
      return false;
    }
    return true;
  }
}
