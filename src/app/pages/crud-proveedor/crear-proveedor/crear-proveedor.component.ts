import { Component, ViewChild } from '@angular/core';
import { Proveedor } from '../../../models/proveedor.model';
import { ProveedorService } from '../../../services/proveedor.service';
import { HttpClient } from '@angular/common/http';
import { ModalBaseController } from '../../../modalbasecontroller';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CrearPersonaComponent } from '../../crud-persona/crear-persona/crear-persona.component';
import { PersonaService } from '../../../services/persona.service';
//import { ModificaPersonaComponent } from '../../crud-persona/modifica-persona/modifica-persona.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-crear-proveedor',
  standalone: true,
  imports: [ButtonModule,CommonModule,FormsModule,DialogModule,
    InputSwitchModule,CrearPersonaComponent,
    InputGroupModule,InputTextModule,InputNumberModule
  ],
  templateUrl: './crear-proveedor.component.html',
  styleUrl: './crear-proveedor.component.css'
})
export class CrearProveedorComponent  extends ModalBaseController {
  obj:Proveedor;
  type:any;//tipo 1 es nuevo, 2=modifica 3consulta
  @ViewChild('modalNuevoPersona') modalNuevoPersona!:CrearPersonaComponent;
  persona_type_content=1;
  //@ViewChild('modalModificaPersona') modalModificaPersona!:ModificaPersonaComponent;
  constructor(httpclient:HttpClient,private service:ProveedorService,private personaService:PersonaService){
    super(httpclient);
    this.obj={creado:null};
  }
  inicializar(mostrar=true,obj:Proveedor={creado:null},type=1,persona_type_content=1){
    this.obj=obj;
    this.ver=mostrar;
    this.type=type;
    this.persona_type_content=persona_type_content;
    if(persona_type_content==2)this.abrirPersona();//si es tipo 2 cargo la persona directo en el form
  }
  async abrirPersona(){
    console.log("Data: ",this.obj)

    if(this.obj.persona || this.obj.key_persona){
      //si ya metio persona antes, elimino el anterior para evitar duplicados, pero relleno con sus datos
      // if(this.obj.key_persona)
      // await this.personaService.deleteReal(this.obj.key_persona)
      // this.modalNuevoPersona.inicializarNuevo(this.obj.persona);
      if(!this.obj.persona){
        this.showToastError("Datos Erroneos, Persona no existe");
        return;
      }
      console.log("Es modificar persona");
      this.modalNuevoPersona.inicializar(true,this.obj.persona,this.type,this.persona_type_content);
    //  this.modalModificaPersona.inicializarNuevo(this.obj.persona,this.obj.key_persona);
    //  this.modalModificaPersona.mostrar();
    }
    else {this.modalNuevoPersona.inicializar(true,{creado:null},1,this.persona_type_content);
      this.modalNuevoPersona.mostrar();
    }

  }
  onSavePersona(data:any){
    console.log("onSavePersona: ",data);
    this.obj.persona=data;
    this.obj.key_persona=data.key;
  }
  // onModificaPersona(data:any){
  //   console.log("onSavePersona: ",data);
  //   this.obj.persona=data;
  // //  this.obj.key_persona=data.key;
  // }
  async guardar(){
    console.log("Guardar: ",this.obj);


    try{

      if(this.persona_type_content==2){//si es tipo form, se guarda manual, sino ya se guardo en modal
        let r=await this.modalNuevoPersona.save();
        if(!r)return;
      }
      if(!this.validar()){return;}
    this.showLoader();
    let doc=await this.service.create(this.obj);
    this.hideLoader();
    this.onSave.emit(doc);
    this.showToastSuccess("Guardado correctamente");
    this.ocultar();
    }catch(error){
      this.showError("Ups","Ocurrio un problema, disculpas por favor.");
      console.log(error);
      this.hideLoader();
    }
  }
  async modificar(){
    console.log("Guardar: ",this.obj);


    try{
      if(this.persona_type_content==2){//si es tipo form, se guarda manual, sino ya se guardo en modal
        let r=await this.modalNuevoPersona.save();
        if(!r)return;
      }

      if(!this.validar()){return;}
      this.showLoader();
    let doc=await this.service.update(this.obj);
    this.hideLoader();
    this.onSave.emit(doc);
    this.showToastSuccess("Guardado correctamente");
    this.ocultar();
    }catch(error){
      this.showError("Ups","Ocurrio un problema, disculpas por favor.");
      console.log(error);
      this.hideLoader();
    }
  }

  validar():Boolean{
    if(!this.obj.persona){this.showToastError("Persona vacia, ingrese datos de persona.");return false;}
    if(!this.obj.key_persona){this.showToastError("Ninguna persona ingresada");return false;}
    return true;
  }
}
