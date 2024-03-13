import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseController } from '../basecontroller';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ FormsModule, CommonModule],
  standalone: true
})
export class LoginComponent extends BaseController{
  phoneNumber: string = '';
  verificationCode: string = '';
  confirmationResult: boolean=false; // Declaración de la variable confirmationResult

  constructor(private authService: AuthService,http:HttpClient) {
    super(http);
    this.isLoggedIn();
  } //  Inyecta el servicio AuthService

  // ngOnInit(): void {

  // }

  async sendVerificationCode() {
    try {
      this.showLoader();
     await this.authService.sendVerificationCode(this.phoneNumber);

     this.confirmationResult=true;
     this.hideLoader();
    } catch (error) {
      this.hideLoader();
      console.error(error);
    }
  }

  async verifyCode() {
    try {
      this.showLoader();
      await this.authService.verifyCode(this.verificationCode); // Usa el método del servicio AuthService
      this.isLoggedIn();
      this.confirmationResult=false;
      this.hideLoader();
    } catch (error) {
      this.hideLoader();
      console.error(error);
    }
  }

  // Implementa la lógica para verificar si el usuario está autenticado utilizando el método del servicio AuthService
  isLoggedIn(): boolean {
    let r=this.authService.isLoggedIn();
    console.log("isLoggedIn()");
    console.log(r)
    console.log("auth");
    console.log(this.authService.getAuth());
    return r;
  }
}
