import { Injectable } from '@angular/core';

import { RecaptchaVerifier, signInWithPhoneNumber, getAuth, Auth, } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth;
  private recaptchaVerifier: RecaptchaVerifier | undefined;
  private confirmationResult: any;

  constructor() {
    this.auth = getAuth();
  }

  async sendVerificationCode(phoneNumber: string) {
    try {
      if (!this.auth) {
        throw new Error('Firebase Auth not initialized');
      }

      this.recaptchaVerifier = new RecaptchaVerifier(this.auth,'recaptcha-container', {
        size: 'invisible'
      });

      this.confirmationResult = await signInWithPhoneNumber(this.auth, phoneNumber, this.recaptchaVerifier);
      console.log('SMS enviado, ingresa el código de verificación');
    } catch (error) {
      console.error('Error al iniciar sesión con número de teléfono:', error);
      throw error;
    }
  }

    async verifyCode(verificationCode: string) {
      try {
        if (!this.confirmationResult) {
          throw new Error('No confirmation result available');
        }

        const userCredential = await this.confirmationResult.confirm(verificationCode);
        console.log('Usuario autenticado:', userCredential);
        return userCredential;
      } catch (error) {
        console.error('Error al verificar el código de verificación:', error);
        throw error;
      }
    }
  getAuth():Auth{
    return this.auth;
  }

  logout = async () => {
    try {
      await this.auth.signOut();
      console.log('Sesión cerrada exitosamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  isLoggedIn(): boolean {
    console.log(this.auth.currentUser);

    return !!this.auth.currentUser;
  }
}
