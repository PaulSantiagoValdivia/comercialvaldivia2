import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';
import { SubRegion } from '../models/subregion.model';
import { RegionService } from './region.service';

@Injectable({
  providedIn: 'root'
})
export class SubRegionService {
  collection_name="SUBREGION";
  constructor(public firestore: Firestore, private regionService:RegionService) { }


  async getList(withRegion=false){
    const q = query(collection(this.firestore, this.collection_name));
    let result=await getDocs(q);
    let d:SubRegion[]=[];
   // await getDoc(doc(this.firestore, "cities", "2l3bcSGs2vZBIc3RODwp"));
    result.forEach((doc)=>{
      console.log("foreach")
      let obj:SubRegion=Object.setPrototypeOf(doc.data(),SubRegion.prototype);

      obj.key=doc.id;
      d.push(obj);

    })
    if(withRegion){
      let regiones=await this.regionService.getList();

     for(let sr of d){
       let data_n=null;

       //METODO 1 se lista ambas relaciones y luego se busca 1 por 1--mas rapido
      for(let r of regiones){
        if(sr.key_region==r.key){
          sr.region=r;
          break;
        }
      }
      //METODO 2 se itera la lista actual, y por cada uno, consultop por su key relacion
      //  try{
      //    data_n=await this.regionService.getById(sr.key_region);
      //  }catch(er){}
      //  sr.region=data_n;

     }
    }
    console.log("fin");
    return d;
  }
  async create(data:SubRegion) {
    data.creado=new Date().toISOString();
    let copia=JSON.parse(JSON.stringify(data));
    //copia.persona=null;//quito persona para que no se guarde con la persona y sea referenciado siempre
    const docRef = await addDoc(collection(this.firestore, this.collection_name),
    copia);
    console.log(this.collection_name+" Document written with ID: ", docRef.id);
    return docRef.id;
  }
  async update(data:SubRegion) {
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
  async getById(key:any,withRegion=false){

    let docc=await getDoc(doc(this.firestore, this.collection_name, key));
    let obj:SubRegion=Object.setPrototypeOf(docc.data(),SubRegion.prototype);

    if(withRegion)
    obj.region=await this.regionService.getById(obj.key_region);
    obj.key=docc.id;

    return obj;
  }
}
