import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';
import { SubRegion } from '../models/subregion.model';
import { RegionService } from './region.service';
import { Zona } from '../models/zona.model';
import { SubRegionService } from './subregion.service';

@Injectable({
  providedIn: 'root'
})
export class ZonaService {
  collection_name="ZONA";
  constructor(public firestore: Firestore,private subregionService:SubRegionService) { }


  async getList(withSubRegion=false,withRegion=false){
    const q = query(collection(this.firestore, this.collection_name));
    let result=await getDocs(q);
    let d:Zona[]=[];
    result.forEach((doc)=>{
      console.log("foreach")
      let obj:Zona=Object.setPrototypeOf(doc.data(),Zona.prototype);
      obj.key=doc.id;
      d.push(obj);

    })
    if(withSubRegion){
      let subregiones=await this.subregionService.getList(withRegion);
     for(let z of d){
       let data_n=null;
       for(let sr of subregiones){
        if(z.key_subregion==sr.key){
          z.subregion=sr;
          break;
        }
      }

      //  try{
      //    data_n=await this.subregionService.getById(z.key_subregion,withRegion);
      //  }catch(er){}
      //  z.subregion=data_n;
     }
    }
    console.log("fin");
    return d;
  }
  async create(data:Zona) {
    data.creado=new Date().toISOString();
    let copia=JSON.parse(JSON.stringify(data));
    //copia.persona=null;//quito persona para que no se guarde con la persona y sea referenciado siempre
    const docRef = await addDoc(collection(this.firestore, this.collection_name),
    copia);
    console.log(this.collection_name+" Document written with ID: ", docRef.id);
    return docRef.id;
  }
  async update(data:Zona) {
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
  async getById(key:any,withSubRegion=false,withRegion=false){

    let docc=await getDoc(doc(this.firestore, this.collection_name, key));
    let obj:Zona=Object.setPrototypeOf(docc.data(),Zona.prototype);

    if(withSubRegion)
    obj.subregion=await this.subregionService.getById(obj.key_subregion,withRegion);
    obj.key=docc.id;

    return obj;
  }
}
