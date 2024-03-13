import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/persona.service';

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
  confirmationResult: boolean = false;
  userExist:boolean=false;
  persona: any[] = [];
  nombre: string = ''; // Agrega la propiedad para el nombre
  rol: string = ''; // Agrega la propiedad para el rol

  constructor(
    private authService: AuthService,
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn();
  }

  async sendVerificationCode() {
    try {
      await this.authService.sendVerificationCode(this.phoneNumber);
      this.confirmationResult = true;
    } catch (error) {
      console.error(error);
    }
  }

  async verifyCode() {
    try {
      await this.authService.verifyCode(this.verificationCode);
      this.isLoggedIn();
      this.confirmationResult = false;
    } catch (error) {
      console.error(error);
    }
  }

  isLoggedIn() {
    let r = this.authService.isLoggedIn();
    if (r) {
      this.firebaseService.getItems().subscribe((data) => {
        this.persona = data;
        const phoneNumberExists = this.persona.some(
          (person) => person.phoneNumber === this.phoneNumber
        );
        if (phoneNumberExists) {
          console.log('El número de teléfono existe en la tabla de personas.');
        } else {
          console.log('El número de teléfono no existe en la tabla de personas.');
          this.userExist= true;
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Método para registrar a la persona si el número de teléfono no está registrado
  registerPerson() {
    // Comprueba si el número de teléfono ya está registrado antes de registrar
    const phoneNumberExists = this.persona.some(
      (person) => person.phoneNumber === this.phoneNumber
    );
    if (!phoneNumberExists) {
      // Registra a la persona con el formulario de nombre y rol
      const newPerson = {
        phoneNumber: this.phoneNumber,
        nombre: this.nombre,
        rol: this.rol,
      };
      this.firebaseService.addPerson(newPerson).then(() => {
        console.log('Persona registrada exitosamente.');
        this.userExist=false;
        // Realiza cualquier acción adicional después de registrar la persona
    }).catch(error => {
        console.error('Error al registrar la persona:', error);
      });
    } else {
      console.log('El número de teléfono ya está registrado.');
      // Realiza cualquier acción adicional si el número de teléfono ya está registrado
    }
  }
}
