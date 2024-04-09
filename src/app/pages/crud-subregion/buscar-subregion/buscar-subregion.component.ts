import { Component } from '@angular/core';
import { ModalBaseController } from '../../../modalbasecontroller';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { SubRegion } from '../../../models/subregion.model';
import { HttpClient } from '@angular/common/http';
import { SubRegionService } from '../../../services/subregion.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-buscar-subregion',
  standalone: true,
  imports: [DialogModule,FormsModule,TableModule,ButtonModule,BadgeModule,CommonModule,SidebarComponent],
  templateUrl: './buscar-subregion.component.html',
  styleUrl: './buscar-subregion.component.css'
})
export class BuscarSubregionComponent extends ModalBaseController{
  list?:SubRegion[]=[];
  filter_text:string="";
  constructor(httpclient:HttpClient,private service:SubRegionService){
    super(httpclient);

  }
  async recargarLista_(){
    // this.recargarLista(this.current_page);
     try{
         this.showLoader();
         this.list=await this.service.getList(true);
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
     let list:SubRegion[]=[];
     if(!this.list)return;
     for(let l of this.list){
       if(l.nombre && l.nombre.toLowerCase().includes(this.filter_text.toLowerCase())){
         list.push(l);
       }else if(l.region?.nombre?.toLocaleLowerCase().includes(this.filter_text.toLowerCase())){
        list.push(l);
       }

     }
     this.list=list;
  }
  getList():any{
    return this.list;
  }
  clickSelect(data:SubRegion){
    console.log("clickSelect: ",data);
    this.onSave.emit(data);
    this.ver=false;
  }
  inicializar(mostrar=true){
    this.ver=mostrar;
    this.recargarLista_();
  }
}
