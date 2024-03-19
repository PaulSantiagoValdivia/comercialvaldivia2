//import { environment } from './../../../environments/environment';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { BaseController } from './basecontroller';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
//import { ModalEstudianteComponent } from './modal-estudiante/modal-estudiante.component';
//import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-base-comp',
  template: `
    <p>
      base works!
    </p>
  `,
  styles: [
  ],
  //imports: [CommonModule,FormsModule,InputNumberModule,
  //  InputTextModule,DropdownModule,CheckboxModule,ButtonModule
  ///]
})
export class ModalBaseController extends BaseController {
  ver=false;
  @Output() onSave=new EventEmitter<any>();
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
  mostrar(){
    this.ver=true;
  }
  ocultar(){
    this.ver=false;
  }
  emitirEventoOnSave(data:any){
    this.onSave.emit(data);
  };




}
