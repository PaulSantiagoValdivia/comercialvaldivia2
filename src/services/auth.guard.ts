import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Verifica si localStorage está disponible
    if (typeof localStorage !== 'undefined') {
      // Verifica si el usuario está autenticado o si el estado de autenticación persistente está establecido
      if (this.authService.isLoggedIn() || localStorage.getItem('isLoggedIn') === 'true') {
        return true; // Si el usuario está autenticado o el estado de autenticación persistente está establecido, permite el acceso
      } else {
        this.router.navigate(['/login']); // Redirige al inicio de sesión si no está autenticado
        return false;
      }
    } else {
      // Maneja el caso donde localStorage no está disponible (por ejemplo, en entornos de servidor como Node.js)
      console.error('localStorage is not available. Unable to determine authentication status.');
      return false;
    }
  }
}
