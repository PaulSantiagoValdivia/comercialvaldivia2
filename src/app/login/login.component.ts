import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ FormsModule, CommonModule],
  standalone: true
})
export class LoginComponent implements OnInit {
  phoneNumber: string = '';
  verificationCode: string = '';
  confirmationResult: boolean=false; // Declaración de la variable confirmationResult

  constructor(private authService: AuthService) { } // Inyecta el servicio AuthService

  ngOnInit(): void {

  }

  async sendVerificationCode() {
    try {
      
     await this.authService.sendVerificationCode(this.phoneNumber);
     this.confirmationResult=true;
    } catch (error) {
      console.error(error);
    }
  }

  async verifyCode() {
    try {
      await this.authService.verifyCode(this.verificationCode); // Usa el método del servicio AuthService
      this.isLoggedIn();
      this.confirmationResult=false;
    } catch (error) {
      console.error(error);
    }
  }

  // Implementa la lógica para verificar si el usuario está autenticado utilizando el método del servicio AuthService
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
