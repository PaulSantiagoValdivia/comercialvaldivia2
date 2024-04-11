import { Component } from '@angular/core';
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
import { Sku } from '../../../models/sku.model';
import { SkuService } from '../../../services/sku.service';
@Component({
  selector: 'app-crear-sku',
  standalone: true,
  imports: [ButtonModule,CommonModule,FormsModule,DialogModule,
    InputSwitchModule,
    InputGroupModule,InputTextModule,InputNumberModule],
  templateUrl: './crear-sku.component.html',
  styleUrl: './crear-sku.component.css'
})
export class CrearSkuComponent extends ModalBaseController{
  obj:Sku;
  type:any;//tipo 1 es nuevo, 2=modifica 3consulta
  constructor(httpclient:HttpClient,private service:SkuService){
    super(httpclient);
    this.obj={creado:null};
  }
  inicializar(mostrar=true,obj:Sku={creado:null},type=1){
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
      console.log(key);

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
    if(this.obj.sku=="" || this.obj.sku==null){
      this.showToastError("Codigo vacio, verifique los datos");
      return false;
    }
    if(this.obj.modelo=="" || this.obj.modelo==null){
      this.showToastError("Codigo vacio, verifique los datos");
      return false;
    }
    if(this.obj.tipo=="" || this.obj.tipo==null){
      this.showToastError("Codigo vacio, verifique los datos");
      return false;
    }
    return true;
  }
}
