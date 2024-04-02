import { Persona } from "./persona.model";

export class Proveedor {
  nro_legajo?:string|null;
  key?:string|null;
  region?:string|null;
  key_persona?:string|null;
  persona?:Persona|null;
  creado?:any;
  activo?:boolean;
}
