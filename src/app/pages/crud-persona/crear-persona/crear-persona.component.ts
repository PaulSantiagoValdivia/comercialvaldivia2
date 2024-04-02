import { CommonModule } from '@angular/common';
import { Component, Output,EventEmitter } from '@angular/core';
import { PersonaService } from '../../../services/persona.service';
import { FormsModule } from '@angular/forms';
import { BaseController } from '../../../basecontroller';
import { HttpClient } from '@angular/common/http';
import { RolService } from '../../../services/rol.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-crear-persona',
  standalone: true,
  imports: [CommonModule,FormsModule,InputNumberModule,
    InputTextModule,DropdownModule,CheckboxModule,ButtonModule,DialogModule
  ],
  templateUrl: './crear-persona.component.html',
  styleUrl: './crear-persona.component.css',
  providers: []
})
export class CrearPersonaComponent extends BaseController{
  ver=false;
  obj:any={};
  @Output() onSave=new EventEmitter<any>();

  roles:any=[];
  constructor(public personaService:PersonaService,private http:HttpClient,
    private roleService:RolService,
    ){
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
    let key=await this.personaService.create(this.obj.name,this.obj.lastname,this.obj.phoneNumber,this.obj.role,
      this.obj.registerMobile,this.obj.registerWeb,this.obj.validate
      );
      this.obj.key=key;
    this.hideLoader();
    this.onSave.emit(this.obj);
    this.showToastSuccess("Guardado correctamente");
    //Swal.
    //this.messageService.add({severity: 'success', summary:  'Guardado', detail: 'Correcto.' });
    this.ocultar();


    //alert("Guardando correctamente");
    }catch(error){
      this.showError("Ups","Ocurrio un problema, disculpas por favor.");
      console.log(error);
      this.hideLoader();
    }
  }
}
