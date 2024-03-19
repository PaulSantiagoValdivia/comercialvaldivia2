import { Component } from '@angular/core';
import { ModalBaseController } from '../../../modalbasecontroller';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Permiso, Rol } from '../../../models/rol.model';
import { HttpClient } from '@angular/common/http';
import {DragDropModule} from 'primeng/dragdrop';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { RolService } from '../../../services/rol.service';
import { InputSwitchModule } from 'primeng/inputswitch';
@Component({
  selector: 'app-crear-rol',
  standalone: true,
  imports: [ButtonModule,CommonModule,FormsModule,DragDropModule,
    CheckboxModule,DialogModule,InputTextModule,InputGroupModule,InputSwitchModule],
  templateUrl: './crear-rol.component.html',
  styleUrl: './crear-rol.component.css'
})
export class CrearRolComponent extends ModalBaseController {
 obj:Rol;

 list_permisos?:Permiso[]
 permiso_drag!:Permiso|null;
 add_sub_menu_text!:string;
 type:any;//tipo 1 es nuevo, 2=modifica 3consulta
    constructor(httpclient:HttpClient,private rolService:RolService){
        super(httpclient);


        this.obj={creado:null};
        this.list_permisos=[];
        this.list_permisos?.push(
          {url_relative:"./rol",nombre:"Rol"},
          {url_relative:"./persona",nombre:"Persona"},
          {url_relative:"./mantenimiento",nombre:"Equipos frios"},
          {url_relative:"./equipos_frios",nombre:"Equipos Calientes"},
          {url_relative:"./equipo_pesado",nombre:"Equipo Pesados"},
          {url_relative:"./Proveedores",nombre:"Proveedores"},

          );
        console.log("list_permisos");
        console.log(this.list_permisos);
        this.agregarSubMenu();
      }

      inicializar(mostrar=true,obj:Rol={creado:null},type=1){
        this.obj=obj;
        this.ver=mostrar;
        this.type=type;
      }
      onDropGral(data:any){
          if(this.permiso_drag==null)return;
            console.log("data_ondrop",data);
            if(this.obj.permisos==null)this.obj.permisos=[];
            this.obj.permisos.push(this.permiso_drag);
            this.permiso_drag=null;
      }
      onDropSub(data:any,permiso:Permiso){
        if(this.permiso_drag==null)return;
          console.log("data_ondrop",data);
          if(permiso.permisos==null)permiso.permisos=[];
          permiso.permisos.push(this.permiso_drag);
          this.permiso_drag=null;
      }
      onStartDrag(data:any){
        console.log("data_ondrop",data);
       this.permiso_drag=data;
      }
      onEndDrag(data:any){
        console.log("data_ondrop",data);
      }
      agregarSubMenu(){
        if(this.obj.permisos==null)this.obj.permisos=[];

        if(!this.add_sub_menu_text)this.add_sub_menu_text="Menu";

        this.obj.permisos.push({is_sub_menu:true,nombre:this.add_sub_menu_text,permisos:[]})
      }
      onEndDragRemoveGral(permiso:Permiso){
        if(this.obj.permisos==null)this.obj.permisos=[];
        const index = this.obj.permisos.indexOf(permiso);
      if (index > -1) { // only splice array when item is found
        this.obj.permisos.splice(index, 1); // 2nd parameter means remove one item only
      }
      }
      verMenuArmado(){
        console.log("Menuarmado:",this.obj);
      }
      async guardar(){
        console.log("Guardar: ",this.obj);
        if(!this.validar()){return;}
        this.showLoader();
        try{

        let doc=await this.rolService.create(this.obj);
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
        if(!this.validar()){return;}
        this.showLoader();
        try{

        let doc=await this.rolService.update(this.obj);
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
        if(!this.obj.nombre){this.showToastError("Verifique el dato nombre por favor.");return false;}
        if(!this.obj.permisos){this.showToastError("Permisos vacios verifique por favor");return false;}
        for(let p of this.obj.permisos){
          if(p.is_sub_menu && !p.permisos){
            {this.showToastError("Menu con Permisos vacios verifique por favor");return false;}
          }
        }
        return true;
      }
}
