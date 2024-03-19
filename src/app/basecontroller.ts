//import { environment } from './../../../environments/environment';
import { Component, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
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
  ]
})
export abstract class BaseController {
  firebaseConfig = {
    apiKey: "AIzaSyDbWH-Nxg2FuR9H1-yk7rjEVY6_XwG9juw",
    authDomain: "test-cbntrade.firebaseapp.com",
    projectId: "test-cbntrade",
    storageBucket: "test-cbntrade.appspot.com",
    messagingSenderId: "164556829628",
    appId: "1:164556829628:web:91ce830488533ef4afb1b9",
    measurementId: "G-H7B0ECN420"
  };
  //list:any=[];
  size_page=7;
  total_register=0;
  current_page=0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }






  openFileinNewTab(file: File){
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = file.name;
    link.target="_blank";
    link.click();
  }
  // async urlToFile(url:String,fileName:any,type_file={ type: 'application/pdf' }){
  //   try{
  //   let blob=await this.sync_SendGetRequest2(url,{ responseType: 'blob' ,
  //   headers: {'Access-Control-Allow-Origin':'https://www.google.com'}
  //   //headers: new HttpHeaders({ }
  //   });
  //   let file=new File([blob as any], fileName, type_file)
  //   return new Promise((resolve, reject) => {resolve(file)});
  //   }catch(error){
  //     console.log("Error en urlToFile");
  //     console.log(error);
  //     return new Promise((resolve, reject) => {reject(error)});
  //   }
  // }
  async sync_SendPostRequest2(url:String,data:Object,option:Object){
    return new Promise((resolve, reject) => {
      this.httpClient.post(String(url), data,option).subscribe((response)=>{resolve(response)},(error)=>{console.log(error); reject(error)})
      //this.sendPostRequest(url,data,option).subscribe((response)=>{resolve(response)},(error)=>{console.log(error); reject(error)})
    });
  }
  async sync_SendPostRequest(url:String,data:Object){
    return new Promise((resolve, reject) => {
      this.sendPostRequest(url,data).subscribe((response)=>{resolve(response)},(error)=>{console.log(error); reject(error)})
    });
  }
  async sync_SendGetRequest(url:String){
    return new Promise((resolve, reject) => {
      this.sendGetRequest(url).subscribe((response)=>{resolve(response)},(error)=>{console.log(error); reject(error)})
    });
  }
  async sync_SendGetRequest2(url:String,option:Object){
    return new Promise((resolve, reject) => {
      this.httpClient.get(String(url),option).subscribe((response)=>{resolve(response)},(error)=>{console.log(error); reject(error)})
      //this.sendGetRequest(url,option)
    });
  }
  sendPostRequest(url: String,data: Object): Observable<Object> {

    return this.httpClient.post(String(url), data);
  }
  sendGetRequest(url: String,option=null) {
    if(!option)
    return this.httpClient.get(String(url));
    else return this.httpClient.get(String(url),option);
  }
  showLoader(){
    let l=document.querySelector('#loading_test') as any;
    l.style.display="block";
  }
  hideLoader(){
    let l=document.querySelector('#loading_test') as any;
    l.style.display="none";
  }
  // ocultarTexto(texto: any) {
  //   texto=new String(texto);
  //   var longitud = texto.length;
  //   if (longitud <= 7) {
  //     return texto;
  //   }
  //   var primerosDosCaracteres = texto.substr(0, 2);
  //   var ultimosDosCaracteres = texto.substr(-2);
  //   var caracteresIntermedios = "*".repeat(longitud - 4);

  //   return primerosDosCaracteres + caracteresIntermedios + ultimosDosCaracteres;
  // }
  public toLowerCaseExceptFirst(text: string){
    if(text==null || text=="")return text;
    text = text.charAt(0) + text.substring(1).toLowerCase();

    return text;
  }
  public validateEmail_(email:any) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  // public getLocalUser():any{
  //   let user=JSON.parse(localStorage.getItem('user') as any).data;
  //   return user;
  // }
  // public getLocalCustomer():any{
  //   let userCustomerCliente=JSON.parse(localStorage.getItem('user') as any).data.CustomerCliente;
  //   return userCustomerCliente;
  // }
  public volverAtras_(){
    javascript:history.back();
  }
   encrypt_data(string:any) {
    string = unescape(encodeURIComponent(string));
    var newString = '',
       char, nextChar, combinedCharCode;
    for (var i = 0; i < string.length; i += 2) {
    char = string.charCodeAt(i);

  if ((i + 1) < string.length) {


  nextChar = string.charCodeAt(i + 1) - 31;


  combinedCharCode = char + "" + nextChar.toLocaleString('en', {
   minimumIntegerDigits: 2
  });

  newString += String.fromCharCode(parseInt(combinedCharCode, 10));

  } else {


  newString += string.charAt(i);
  }
  }
  return newString.split("").reduce((hex,c)=>hex+=c.charCodeAt(0).toString(16).padStart(4,"0"),"");
  }
  decrypt_data(string:any) {

    var newString = '',
    char, codeStr, firstCharCode, lastCharCode;
    string = string.match(/.{1,4}/g).reduce((acc:any,char:any)=>acc+String.fromCharCode(parseInt(char, 16)),"");
    for (var i = 0; i < string.length; i++) {
    char = string.charCodeAt(i);
    if (char > 132) {
    codeStr = char.toString(10);

    firstCharCode = parseInt(codeStr.substring(0, codeStr.length - 2), 10);

    lastCharCode = parseInt(codeStr.substring(codeStr.length - 2, codeStr.length), 10) + 31;

    newString += String.fromCharCode(firstCharCode) + String.fromCharCode(lastCharCode);
    } else {
    newString += string.charAt(i);
    }
    }
    return newString;
    }

    showToastError(_msg:any){
      let Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "info",
        title: _msg
      });
    }
    showToastSuccess(_msg:any){
      let Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: _msg
      });
    }
    showSuccess(title:any,text:any){
      Swal.fire({
        title,
        text,
        icon: "success"
      });
    }
    showError(title:any,text:any){
      Swal.fire({
        title,
        text,
        icon: "error"
      });
    }
    automaticParsePhoneNumber(number:any,concat="+591"){
      if(number==null)return number;
      if(String(number).substring(0, 1)=="+"){
        return number;
      }else{
        return concat+String(number);
      }

    }
}
