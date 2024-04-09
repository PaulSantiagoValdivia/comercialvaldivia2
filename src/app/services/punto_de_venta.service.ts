import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';
import { TerritorioService } from './territorio.service';
import { PuntoDeVenta } from '../models/punto_de_venta';

@Injectable({
  providedIn: 'root'
})
export class PuntoDeVentaService {
  collection_name="PUNTODEVENTA";
  constructor(public firestore: Firestore,private territorioService:TerritorioService) { }


  async getList(withTerritorio=false,withZona=false,withSubRegion=false,withRegion=false){
    const q = query(collection(this.firestore, this.collection_name));
    let result=await getDocs(q);
    let d:PuntoDeVenta[]=[];
    result.forEach((doc)=>{
      console.log("foreach")
      let obj:PuntoDeVenta=Object.setPrototypeOf(doc.data(),PuntoDeVenta.prototype);
      obj.key=doc.id;
      d.push(obj);

    })
    if(withTerritorio){
      let territorios=await this.territorioService.getList(withZona,withSubRegion,withRegion);
     for(let p of d){
       let data_n=null;

       for(let t of territorios){
        if(p.key_territorio==t.key){
          p.territorio=t;
          break;
        }
      }
        // try{
        //   data_n=await this.zonaService.getById(t.key_zona,withSubRegion,withRegion);
        // }catch(er){}
        // t.zona=data_n;
     }
    }
    console.log("fin");
    return d;
  }
  async create(data:PuntoDeVenta) {
    data.creado=new Date().toISOString();
    let copia=JSON.parse(JSON.stringify(data));
    //copia.persona=null;//quito persona para que no se guarde con la persona y sea referenciado siempre
    const docRef = await addDoc(collection(this.firestore, this.collection_name),
    copia);
    console.log(this.collection_name+" Document written with ID: ", docRef.id);
    return docRef.id;
  }
  async update(data:PuntoDeVenta) {
    let obj={}
    obj=JSON.parse(JSON.stringify(data));
    console.log("update",obj);
    let result=await updateDoc(doc(this.firestore, this.collection_name, String(data.key)),
    obj
    );
    console.log("Modificado correctamente: ",result);
  }
  async delete(key:any,delet?:boolean) {
    let result=await updateDoc(doc(this.firestore, this.collection_name, key),{
      activo:delet?delet:false,
    });
    console.log("Eliminado correctamente: ",result,"delete: ",delet);
  }
  async getById(key:any,withTerritorio=false,withZona=false,withSubRegion=false,withRegion=false){

    let docc=await getDoc(doc(this.firestore, this.collection_name, key));
    let obj:PuntoDeVenta=Object.setPrototypeOf(docc.data(),PuntoDeVenta.prototype);
    obj.key=docc.id;
    if(withTerritorio)
    obj.territorio=await this.territorioService.getById(obj.key_territorio,withZona,withSubRegion,withRegion);


    return obj;
  }
}
