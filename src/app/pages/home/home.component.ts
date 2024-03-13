import { CommonModule } from '@angular/common';
import { Component, OnInit,Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'home-root',
  standalone: true,
  imports: [ FormsModule, CommonModule, SidebarComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
@Injectable({
  providedIn: 'root'
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {

  }


}
