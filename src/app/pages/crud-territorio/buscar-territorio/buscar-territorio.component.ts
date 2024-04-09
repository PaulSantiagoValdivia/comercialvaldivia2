import { Component } from '@angular/core';
import { ModalBaseController } from '../../../modalbasecontroller';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { HttpClient } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { Zona } from '../../../models/zona.model';
import { ZonaService } from '../../../services/zona.service';
import { TerritorioService } from '../../../services/territorio.service';
import { Territorio } from '../../../models/territorio.model';

@Component({
  selector: 'app-buscar-territorio',
  standalone: true,
  imports: [DialogModule,FormsModule,TableModule,ButtonModule,BadgeModule,CommonModule,SidebarComponent],
  templateUrl: './buscar-territorio.component.html',
  styleUrl: './buscar-territorio.component.css'
})
export class BuscarTerritorioComponent extends ModalBaseController{
  list:Zona[]=[];
  filter_text:string="";
  constructor(httpclient:HttpClient,private service:TerritorioService){
    super(httpclient);

  }
  async recargarLista_(){
    // this.recargarLista(this.current_page);
     try{
         this.showLoader();
         this.list=await this.service.getList(true,true,true);
         console.log("list: ",this.list);
         this.hideLoader();
         this.filtrar();
     }catch(err){
       this.hideLoader();
       console.log(err);
       this.showError("Ups.","Ocurrio un error al listar");
     }
   }
   filtrar(){
     let list:Territorio[]=[];
     if(!this.list)return;
     for(let l of this.list){
      if(l.codigo && l.codigo.toLowerCase().includes(this.filter_text.toLowerCase())){
        list.push(l);
      }else
       if(l.nombre && l.nombre.toLowerCase().includes(this.filter_text.toLowerCase())){
         list.push(l);
       }
      //  else if(l.region?.nombre?.toLocaleLowerCase().includes(this.filter_text.toLowerCase())){
      //   list.push(l);
      //  }

     }
     this.list=list;
  }
  getList():any{
    return this.list;
  }
  clickSelect(data:Zona){
    console.log("clickSelect: ",data);
    this.onSave.emit(data);
    this.ver=false;
  }
  inicializar(mostrar=true){
    this.ver=mostrar;
    this.recargarLista_();
  }
}
