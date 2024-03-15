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
 ofertas = [
    {
      imagen: "ruta/a/imagen1.jpg",
      name: "Oferta 1",
      Comercio: { name: "Comercio 1" },
      url: "https://ejemplo.com/oferta1",
      countryName: "País 1"
    },
    {
      imagen: "ruta/a/imagen2.jpg",
      name: "Oferta 2",
      Comercio: { name: "Comercio 2" },
      url: "https://ejemplo.com/oferta2",
      countryName: "País 2"
    },
    {
      imagen: "ruta/a/imagen3.jpg",
      name: "Oferta 3",
      Comercio: { name: "Comercio 3" },
      url: "https://ejemplo.com/oferta3",
      countryName: "País 3"
    },
    {
      imagen: "ruta/a/imagen4.jpg",
      name: "Oferta 4",
      Comercio: { name: "Comercio 4" },
      url: "https://ejemplo.com/oferta4",
      countryName: "País 4"
    },
    {
      imagen: "ruta/a/imagen5.jpg",
      name: "Oferta 5",
      Comercio: { name: "Comercio 5" },
      url: "https://ejemplo.com/oferta5",
      countryName: "País 5"
    },
    {
      imagen: "ruta/a/imagen6.jpg",
      name: "Oferta 6",
      Comercio: { name: "Comercio 6" },
      url: "https://ejemplo.com/oferta6",
      countryName: "País 6"
    },
    {
      imagen: "ruta/a/imagen7.jpg",
      name: "Oferta 7",
      Comercio: { name: "Comercio 7" },
      url: "https://ejemplo.com/oferta7",
      countryName: "País 7"
    },
    {
      imagen: "ruta/a/imagen8.jpg",
      name: "Oferta 8",
      Comercio: { name: "Comercio 8" },
      url: "https://ejemplo.com/oferta8",
      countryName: "País 8"
    },
    {
      imagen: "ruta/a/imagen9.jpg",
      name: "Oferta 9",
      Comercio: { name: "Comercio 9" },
      url: "https://ejemplo.com/oferta9",
      countryName: "País 9"
    },
    {
      imagen: "ruta/a/imagen10.jpg",
      name: "Oferta 10",
      Comercio: { name: "Comercio 10" },
      url: "https://ejemplo.com/oferta10",
      countryName: "País 10"
    },
    {
      imagen: "ruta/a/imagen11.jpg",
      name: "Oferta 11",
      Comercio: { name: "Comercio 11" },
      url: "https://ejemplo.com/oferta11",
      countryName: "País 11"
    },
    {
      imagen: "ruta/a/imagen12.jpg",
      name: "Oferta 12",
      Comercio: { name: "Comercio 12" },
      url: "https://ejemplo.com/oferta12",
      countryName: "País 12"
    },
    {
      imagen: "ruta/a/imagen13.jpg",
      name: "Oferta 13",
      Comercio: { name: "Comercio 13" },
      url: "https://ejemplo.com/oferta13",
      countryName: "País 13"
    },
    {
      imagen: "ruta/a/imagen14.jpg",
      name: "Oferta 14",
      Comercio: { name: "Comercio 14" },
      url: "https://ejemplo.com/oferta14",
      countryName: "País 14"
    },
    {
      imagen: "ruta/a/imagen15.jpg",
      name: "Oferta 15",
      Comercio: { name: "Comercio 15" },
      url: "https://ejemplo.com/oferta15",
      countryName: "País 15"
    },
    {
      imagen: "ruta/a/imagen16.jpg",
      name: "Oferta 16",
      Comercio: { name: "Comercio 16" },
      url: "https://ejemplo.com/oferta16",
      countryName: "País 16"
    },
    {
      imagen: "ruta/a/imagen17.jpg",
      name: "Oferta 17",
      Comercio: { name: "Comercio 17" },
      url: "https://ejemplo.com/oferta17",
      countryName: "País 17"
    },
    {
      imagen: "ruta/a/imagen18.jpg",
      name: "Oferta 18",
      Comercio: { name: "Comercio 18" },
      url: "https://ejemplo.com/oferta18",
      countryName: "País 18"
    },
    {
      imagen: "ruta/a/imagen19.jpg",
      name: "Oferta 19",
      Comercio: { name: "Comercio 19" },
      url: "https://ejemplo.com/oferta19",
      countryName: "País 19"
    },
    {
      imagen: "ruta/a/imagen20.jpg",
      name: "Oferta 20",
      Comercio: { name: "Comercio 20" },
      url: "https://ejemplo.com/oferta20",
      countryName: "País 20"
    }
  ];

  constructor() {
  }

  ngOnInit(): void {

  }


}
