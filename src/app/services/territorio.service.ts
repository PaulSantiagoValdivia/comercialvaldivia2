import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';

import { Territorio } from '../models/territorio.model';
import { ZonaService } from './zona.service';

@Injectable({
  providedIn: 'root'
})
export class TerritorioService {
  collection_name="TERRITORIO";
  constructor(public firestore: Firestore,private zonaService:ZonaService) { }


  async getList(withZona=false,withSubRegion=false,withRegion=false){
    const q = query(collection(this.firestore, this.collection_name));
    let result=await getDocs(q);
    let d:Territorio[]=[];
    result.forEach((doc)=>{
      console.log("foreach")
      let obj:Territorio=Object.setPrototypeOf(doc.data(),Territorio.prototype);
      obj.key=doc.id;
      d.push(obj);

    })
    if(withZona){
      let zonas=await this.zonaService.getList(withSubRegion,withRegion);
     for(let t of d){
       let data_n=null;

       for(let z of zonas){
        if(t.key_zona==z.key){
          t.zona=z;
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
  async create(data:Territorio) {
    data.creado=new Date().toISOString();
    let copia=JSON.parse(JSON.stringify(data));
    //copia.persona=null;//quito persona para que no se guarde con la persona y sea referenciado siempre
    const docRef = await addDoc(collection(this.firestore, this.collection_name),
    copia);
    console.log(this.collection_name+" Document written with ID: ", docRef.id);
    return docRef.id;
  }
  async update(data:Territorio) {
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
  async getById(key:any,withZona=false,withSubRegion=false,withRegion=false){

    let docc=await getDoc(doc(this.firestore, this.collection_name, key));
    let obj:Territorio=Object.setPrototypeOf(docc.data(),Territorio.prototype);

    if(withZona)
    obj.zona=await this.zonaService.getById(obj.key_zona,withSubRegion,withRegion);
    obj.key=docc.id;

    return obj;
  }
}
