import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/persona.service';
import { BaseController } from '../basecontroller';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class LoginComponent extends BaseController implements OnInit {
  phoneNumber: string = '';
  verificationCode: string = '';
  confirmationResult: boolean = false;
  userExist: boolean = false;
  validate: boolean = false;
  persona: any[] = [];
  nombre: string = '';
  lastname: string = '';
  r: boolean = false;
  bandera: boolean = false;
  animacion: boolean = false;
  constructor(
    http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private firebaseService: FirebaseService
  ) {
    super(http);
  }
  override ngOnInit(): void {
    this.bandera= this.authService.isLoggedIn();
    console.log(this.bandera);

        // Verificar si el usuario está autenticado al cargar la aplicación
          if (this.bandera) {
            // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
         this.router.navigate(['/']);
         }else{
         this.router.navigate(['/login']);
         }


  }

  async sendVerificationCode() {
    this.animacion=true;
    try {
      const number = "+591"+this.phoneNumber;
      console.log("parseado",this.automaticParsePhoneNumber(number));
      console.log(this.phoneNumber);

      await this.authService.sendVerificationCode(this.automaticParsePhoneNumber(this.phoneNumber));
      this.confirmationResult = true;
      // this.hideLoader();
    } catch (error) {
      this.hideLoader();
      console.error(error);
    }
  }

  async verifyCode() {
    this.animacion=false;
    try {
      this.showLoader();
      const userCredential = await this.authService.verifyCode(this.verificationCode);
      // Almacena el resultado en una variable
      if (userCredential) {
        // Aquí puedes hacer lo que quieras con userCredential
        console.log('Usuario autenticado:', userCredential);
        // Por ejemplo, podrías llamar a isLoggedIn() si es necesario
        this.isLoggedIn();
      } else {
        console.log('Error: No se pudo verificar el código de verificación.');
      }
    } catch (error) {
      this.hideLoader();
      console.error('Error al verificar el código de verificación:', error);
    }

  }



  isLoggedIn() {
    try {
      this.showLoader();
      this.firebaseService.getPersonByPhoneNumber(this.phoneNumber).subscribe((data) => {
        if (data.length > 0) {
          const user = data[0];
          if (user.validate) {
            this.hideLoader();
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', 'true');
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
            console.log('El número de teléfono existe en la tabla de personas y la cuenta está validada.');
          } else {
            console.log('La cuenta está esperando a ser validada.');
            this.hideLoader();
            this.validate = true;
          }
        } else {
          console.log('El número de teléfono no existe en la tabla de personas.');
          this.userExist = true;
          this.hideLoader();
        }
      });
    } catch (error) {
      this.hideLoader();
      console.error('Error al obtener datos:', error);
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
        name: this.nombre,
        lastname: this.lastname,
        validate: false,
        registerWeb: true,
        registerMobile: false,
        role: '',
      };
      this.firebaseService.addPerson(newPerson).then(() => {
        console.log('Persona registrada exitosamente.');
        this.userExist = false;
        this.confirmationResult = false;
        this.isLoggedIn();

      }).catch(error => {
        console.error('Error al registrar la persona:', error);
      });
    } else {
      console.log('El número de teléfono ya está registrado.');
      // Realiza cualquier acción adicional si el número de teléfono ya está registrado
    }
  }
  onPhoneNumberChange() {
    // Verificar si el número de teléfono tiene una longitud válida
    if (this.phoneNumber && this.phoneNumber.length === 9) {
      // Enfocar el campo de verificación
      const verificationInput = document.getElementById('verificationCode');
      if (verificationInput) {
        verificationInput.focus();
      }
    }
  }

}
