export class Rol {
  nombre?:string;
  key?:string;
  permisos?:Permiso[];
  creado?:any=null;
  activo?:boolean=false;
}
export class Permiso{
  key?:string;
  url_relative?:string;
  nombre?:string;
  is_sub_menu?:boolean;
  permisos?:Permiso[];
}
