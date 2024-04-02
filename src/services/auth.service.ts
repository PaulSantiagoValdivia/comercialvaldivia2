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
  private userSubject: BehaviorSubject<User | null>;

  constructor( private router: Router) {
    this.auth = getAuth();

    this.userSubject = new BehaviorSubject<User | null>(null);
    this.auth.setPersistence(browserLocalPersistence);

    onAuthStateChanged(this.auth, user => {
      this.userSubject.next(user);
      if (user) {
        // Si el usuario está autenticado, no redirigir al inicio de sesión
        // en lugar de eso, puedes redirigirlo a la página que estaba intentando acceder
        // antes de que se le pidiera iniciar sesión, o a la página principal, por ejemplo.
        // En este caso, lo redirigiremos a la página principal.
        this.router.navigate(['/']);
      } else {
        // Si el usuario no está autenticado, redirigirlo a la página de inicio de sesión
        this.router.navigate(['/login']);
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
      console.log('Usuario autenticado:', userCredential);
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
      await this.auth.signOut();
      console.log('Sesión cerrada exitosamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  isLoggedIn(): boolean {
    const currentUser = this.userSubject.value;
    return !!currentUser;
  }
}
