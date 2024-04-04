import { compileDeclareNgModuleFromMetadata } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { RecaptchaVerifier, signInWithPhoneNumber, getAuth, Auth,onAuthStateChanged,User, browserLocalPersistence } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth;
  private recaptchaVerifier: RecaptchaVerifier | undefined;
  private confirmationResult: any;
  private currentUserSubject: BehaviorSubject<User | null>;

  constructor( private router: Router) {
    this.auth = getAuth();
    this.currentUserSubject = new BehaviorSubject<User | null>(null);

    onAuthStateChanged(this.auth, user => {
      if (user) {
        this.currentUserSubject.next(user);
        // Si el usuario está autenticado, establecer el estado de inicio de sesión en el almacenamiento local
        if (typeof localStorage !== 'undefined') {

        }
      } else {
        this.currentUserSubject.next(null);
        // Si el usuario no está autenticado, borrar el estado de inicio de sesión del almacenamiento local
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('isLoggedIn');
        }
      }
    });
  }

  async sendVerificationCode(phoneNumber: string) {
    try {
      if (!this.auth) {
        throw new Error('Firebase Auth not initialized');
      }

      this.recaptchaVerifier = new RecaptchaVerifier(this.auth, 'recaptcha-container', {
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

      return userCredential;
    } catch (error) {
      console.error('Error al verificar el código de verificación:', error);
      throw error;
    }
  }
  getAuth(): Auth {
    return this.auth;
  }

  logout = async () => {
    try {
      // Cerrar sesión en Firebase
      await this.auth.signOut();

      // Limpiar el almacenamiento local
      if (typeof localStorage !== 'undefined') {
        localStorage.clear(); // Borra todos los datos del almacenamiento local
      }

      // Redirigir a la página de inicio de sesión
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });

      console.log('Sesión cerrada exitosamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    // Comprueba si el estado de inicio de sesión está presente en el almacenamiento local
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('isLoggedIn') === 'true';
    } else {
      return false;
    }
  }
}
