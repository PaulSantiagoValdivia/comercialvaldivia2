import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {

  }
  bandera: boolean = false;
  
  ngOnInit(): void {
    this.bandera = this.authService.isLoggedIn();
    console.log(this.bandera);

  }
}
