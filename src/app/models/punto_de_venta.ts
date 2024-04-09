import { Territorio } from "./territorio.model";
export class PuntoDeVenta {
  codigo?:string;
  nombre?:string;
  nombre_fantasia?:string;
  domicilio?:string;
  telefono?:string;
  nit?:string;
  sub_canal?:string;
  ubicacion_x?:string;
  ubicacion_y?:string;
  dia_visita?:string;
  activo?:boolean=false;
  key?:string;
  creado?:any=null;
  key_territorio?:string;
  territorio?:Territorio|null;
}
