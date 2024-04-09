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
  type:any;//1 nuevo 2 mod 3 consulta
  type_content:any;//1 nuevo 2 mod 3 consulta
  roles:any=[];
  constructor(public personaService:PersonaService,private http:HttpClient,
    private roleService:RolService,
    ){
    super(http);
    this.init();
  }
  async init(){
    this.roles=await this.roleService.getList();
  }
  inicializar(mostrar=true,obj:any={creado:null},type=1,type_content=1){
    this.obj=obj;
    this.ver=mostrar;
    this.type=type;
    this.type_content=type_content;//1 es modal 2 es panel
  }

  mostrar(){
    this.ver=true;
  }
  ocultar(){
    this.ver=false;
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
    let r=await this.personaService.update(this.obj.key,this.obj.name,this.obj.lastname,this.obj.phoneNumber,this.obj.role,
      this.obj.registerMobile,this.obj.registerWeb,this.obj.validate
      );
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
    if(this.obj.name=="" || this.obj.name==null){
      this.showToastError("Nombre vacio, verifique los datos");
      return false;
    }
    return true;
  }
}
//NOTA
//AL GUARDAR O MODIFICAR, siempre devolvera el objeto con su key, la key siempre sera llamado key
//PARA INICIALIZAR EN MODO MODIFICAR, se tiene que pasar el objeto con su atributo key
//el metodo Save() , guarda o modifica dependiendo de como fue inializado
//retorna false si existio algun error o validacion
//retorna true si se guardo bien
//type indica:  el modo en que se inicializa,1-nuevo,2-mod,3-consulta
//type_content: 1=modal ,2=form : indica el modo en que se mostrara, puede ser modal o sino un contenido para insertar
//en otro formulario, si ese es el caso, en el form padre, a la hora de guardar, hay que
//ejecutar save() manualmente y si es falso, no seguir
