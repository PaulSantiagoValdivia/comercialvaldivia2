import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BaseController } from '../../basecontroller';
@Component({
  selector: 'app-crud-example',
  templateUrl: './crud-example.component.html',
  styleUrl: './crud-example.component.css'
})
@Injectable({
  providedIn: 'root'
})
export class CrudExampleComponent extends BaseController{

  data_send:any;
    constructor(private router: Router,httpClient: HttpClient){
      super(httpClient);



    }
}
