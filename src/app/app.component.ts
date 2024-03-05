import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecaptchaVerifier, signInWithPhoneNumber, getAuth, Auth,signInWithPopup } from 'firebase/auth';
import { OAuthProvider } from "firebase/auth";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  recaptchaVerifier: RecaptchaVerifier | undefined;
  phoneNumber: string = '';
  verificationCode: string = '';
  confirmationResult: any;
  auth: Auth;
  private readonly provider = new OAuthProvider('microsoft.com');

  constructor() {
    this.auth = getAuth();
  }

  ngOnInit(): void {
    if (this.auth) {
      // Inicializa recaptchaVerifier con el ID del contenedor y un objeto vacío para los parámetros opcionales
      this.recaptchaVerifier = new RecaptchaVerifier(this.auth,'recaptcha-container', {
        size: 'invisible'
      });
    } else {
      console.error('Error al inicializar Firebase Auth.');
    }
  }

  async sendVerificationCode() {
    try {
      console.log(this.auth, this.recaptchaVerifier);

      if (this.auth && this.recaptchaVerifier) {
        this.confirmationResult = await signInWithPhoneNumber(this.auth, this.phoneNumber, this.recaptchaVerifier);
        console.log('SMS enviado, ingresa el código de verificación');
      } else {
        console.error('Auth o recaptchaVerifier no están inicializados.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión con número de teléfono:', error);
    }
  }

  async verifyCode() {
    try {
      if (this.confirmationResult) {
        await this.confirmationResult.confirm(this.verificationCode);
        console.log('Usuario autenticado:', this.confirmationResult.user);
      } else {
        console.error('No hay un resultado de confirmación disponible.');
      }
    } catch (error) {
      console.error('Error al verificar el código de verificación:', error);
    }
  }
  async signInWithMicrosoft() {
    try {
      const auth = getAuth();
      const result = await signInWithPopup(auth, this.provider);
      // El usuario se ha autenticado correctamente
      console.log('Usuario autenticado:', result.user);
    } catch (error) {
      // Manejar cualquier error que ocurra durante el inicio de sesión
      console.error('Error al iniciar sesión con Microsoft:', error);
    }
  }
}
