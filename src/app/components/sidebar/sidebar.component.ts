import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router ,NavigationEnd} from '@angular/router';
import { RolService } from '../../services/rol.service';
import { BaseController } from '../../basecontroller';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [ FormsModule, CommonModule ],
})
export class SidebarComponent extends BaseController implements OnInit {
  loggedInUser: any;
  userRoles: any;
  constructor( http: HttpClient, private authService: AuthService, private router: Router, private rolService: RolService  ) {
    super(http);
  }
  override ngOnInit() {


    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem('loggedInUser');
      if (storedUser) {
        this.loggedInUser = JSON.parse(storedUser);
        console.log('Datos del usuario logueado:', this.loggedInUser);
        if (this.loggedInUser.role) {
          this.getUserRoles(this.loggedInUser.role);
        }
      }
    } else {
      console.error('localStorage is not available');
    }
  }
  activeSubMenuItemIndex: number | null = null; // Variable para mantener el índice del elemento de submenú activo

  sidebarActive: boolean = false;
  svgActive: boolean[] = [];
  activeSubMenu: number | null = null; // Variable para mantener el submenú activo
  imagenUrl = '/assets/user.jpg';
  svg = '/assets/flecha-pequena-izquierda.svg';


  toggleSidebar(): void {
    this.sidebarActive = !this.sidebarActive;
  }

  toggleSubMenu(index: number) {
    if (this.activeSubMenu === index) {
      this.activeSubMenu = null; // Si el submenú está abierto, ciérralo
      this.svgActive[index] = false; // Desactiva la rotación
    } else {
      if (this.activeSubMenu !== null) {
        this.svgActive[this.activeSubMenu] = false; // Desactiva la rotación del menú previamente abierto
      }
      this.activeSubMenu = index; // Abre el submenú correspondiente
      this.svgActive[index] = true; // Activa la rotación
    }
  }
  toggleSubMenuItem(subMenuItemIndex: number) {
    // Activa el elemento del submenú correspondiente
    this.activeSubMenuItemIndex = subMenuItemIndex;
  }

  toggleSvg(index: number) {
    console.log('Toggle SVG llamado para el índice', index);
    if (this.activeSubMenu !== index) {
      this.svgActive[index] = !this.svgActive[index]; // Cambia el estado de la rotación solo si el submenú no está activo
    }
  }


  closeSubMenu(event: Event) {
    event.stopPropagation(); // Evita que el clic en el submenú se propague y active el cierre del submenú
  }
logout() {
  this.showLoader();
  setTimeout(() => {
    this.authService.logout().then(() => {
      console.log('Sesión cerrada exitosamente');
      setTimeout(() => {
        this.hideLoader();
      }, 3000);
    }).catch((error) => {
      this.hideLoader();
      console.error('Error al cerrar sesión:', error);
    });
  }, 3000);

}


  private getUserRoles(userRole: string): void {
    this.rolService.getListByUserRole(userRole)
      .then((roles: any) => {
        this.userRoles = roles[0].permisos;
        console.log(this.userRoles[0].permisos);


      })
      .catch((error) => {
        console.error('Error al obtener los roles del usuario:', error);
      });
  }
}
