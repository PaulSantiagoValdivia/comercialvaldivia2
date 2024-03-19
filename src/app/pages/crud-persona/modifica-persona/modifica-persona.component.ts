import { Component, EventEmitter, Output } from '@angular/core';
import { PersonaService } from '../../../services/persona.service';
import { HttpClient } from '@angular/common/http';
import { BaseController } from '../../../basecontroller';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RolService } from '../../../services/rol.service';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-modifica-persona',
  standalone: true,
  imports: [CommonModule,FormsModule,ButtonModule,CheckboxModule,
    InputNumberModule,
    InputTextModule,
  ],
  templateUrl: './modifica-persona.component.html',
  styleUrl: './modifica-persona.component.css'
})
export class ModificaPersonaComponent extends BaseController{
  ver=false;
  obj:any={};
  key:any;
  isConsulta=false;
  roles:any=[];
  @Output() onSave=new EventEmitter<any>();
  constructor(public personaService:PersonaService,private http:HttpClient,private roleService:RolService){
    super(http);
    this.inicializar();
  }
  async inicializar(){
    this.roles=await this.roleService.getList();
  }
  isConsult(isc:boolean){this.isConsulta=isc}
  mostrar(){this.ver=true;}
  ocultar(){this.ver=false;}
  inicializarNuevo(obj:any={},key:any){
    this.obj=obj;
    this.key=key;
    }

  async guardar(){
    this.showLoader();
    try{
    let doc=await this.personaService.update(this.key,this.obj.name,this.obj.lastname,
      this.obj.phoneNumber,this.obj.role,this.obj.registerMobile,this.obj.registerWeb,this.obj.validate);
    this.hideLoader();
    this.onSave.emit(doc);
    this.showToastSuccess("Guardado correctamente");
    }catch(error){

      console.log(error);
      this.showError("Ups","Ocurrio un problema, disculpas por favor.");
      this.hideLoader();
    }
  }
}
