import { Zona } from "./zona.model";


export class Territorio {
  codigo?:string;
  nombre?:string;
  activo?:boolean=false;
  key?:string;
  creado?:any=null;
  key_zona?:string;
  zona?:Zona|null;
}
