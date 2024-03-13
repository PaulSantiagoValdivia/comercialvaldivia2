import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [ FormsModule, CommonModule ],
})
export class SidebarComponent implements OnInit {

  constructor(  ) {

  }
  ngOnInit() {



  }
  activeSubMenuItemIndex: number | null = null; // Variable para mantener el índice del elemento de submenú activo

  sidebarActive: boolean = false;
  svgActive: boolean[] = [];
  activeSubMenu: number | null = null; // Variable para mantener el submenú activo
  imagenUrl = '/assets/user.jpg';
  svg = '/assets/flecha-pequena-izquierda.svg';
  mainMenuItems: any[] = [
    {
      text: 'Dashboard',
      iconClass: '/assets/add.svg',
      subMenuItems: null
    },
    {
      text: 'Audience',
    iconClass: '/assets/add.svg',
      subMenuItems: [
        { text: 'Users' },
        { text: 'Subscribers' }
      ]
    },
    {
      text: 'Posts',
      iconClass: '/assets/add.svg',
      subMenuItems: null
    },
    {
      text: 'Schedules',
      iconClass: '/assets/add.svg',
      subMenuItems: null
    },
    {
      text: 'Income',
      iconClass: '/assets/add.svg',
      subMenuItems: [
        { text: 'Earnings' },
        { text: 'Funds' },
        { text: 'Declines' },
        { text: 'Payouts' }
      ]
    },
    {
      text: 'Settings',
      iconClass: '/assets/add.svg',
      subMenuItems: [
        { text: 'Settings' }
      ]
    }
  ];

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

}
