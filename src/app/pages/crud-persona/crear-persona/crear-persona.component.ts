import { CommonModule } from '@angular/common';
import { Component, Output,EventEmitter } from '@angular/core';
import { PersonaService } from '../../../services/persona.service';
import { FormsModule } from '@angular/forms';
import { BaseController } from '../../../basecontroller';
import { HttpClient } from '@angular/common/http';
import { RolService } from '../../../services/rol.service';


@Component({
  selector: 'app-crear-persona',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './crear-persona.component.html',
  styleUrl: './crear-persona.component.css'
})
export class CrearPersonaComponent extends BaseController{
  ver=false;
  obj:any={};
  @Output() onSave=new EventEmitter<any>();

  roles:any=[];
  constructor(public personaService:PersonaService,private http:HttpClient,private roleService:RolService){
    super(http);
    this.inicializar();
  }
  async inicializar(){
    this.roles=await this.roleService.getList();
  }
  inicializarNuevo(obj:any={}){
  this.obj=obj;

  }
  mostrar(){
    this.ver=true;
  }
  ocultar(){
    this.ver=false;
  }
  async guardar(){
    //alert('asf')
    this.showLoader();
    try{
      console.log("Guardar: ",this.obj);
    let doc=await this.personaService.create(this.obj.name,this.obj.lastname,this.obj.phoneNumber,this.obj.role,
      this.obj.registerMobile,this.obj.registerWeb,this.obj.validate
      );
    this.hideLoader();
    this.onSave.emit(doc);
    this.ocultar();

    //alert("Guardando correctamente");
    }catch(error){
      console.log(error);
      this.hideLoader();
    }
  }
}
