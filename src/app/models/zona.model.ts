import { SubRegion } from "./subregion.model";


export class Zona {
  codigo?:string;
  nombre?:string;
  activo?:boolean=false;
  key?:string;
  creado?:any=null;
  key_subregion?:string;
  subregion?:SubRegion|null;
}
