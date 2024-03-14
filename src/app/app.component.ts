import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [  RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verificar si el usuario está autenticado al cargar la aplicación
    // if (!this.authService.isLoggedIn()) {
    //   // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
    //   this.router.navigate(['/login']);
    // }
  }
}
