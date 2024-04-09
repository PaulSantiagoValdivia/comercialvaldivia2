import { Region } from "./region.model";

export class SubRegion {
  codigo?:string;
  nombre?:string;
  activo?:boolean=false;
  key?:string;
  creado?:any=null;
  key_region?:string;
  region?:Region|null;
}
