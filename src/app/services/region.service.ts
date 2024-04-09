import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';
import { Region } from '../models/region.model';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  collection_name="REGION";
  constructor(public firestore: Firestore) { }


  async getList(activo=null){
    const q = query(collection(this.firestore, this.collection_name));
    let result=await getDocs(q);
    let d:Region[]=[];
   // await getDoc(doc(this.firestore, "cities", "2l3bcSGs2vZBIc3RODwp"));
    result.forEach((doc)=>{
      console.log("foreach")
      let obj:Region=Object.setPrototypeOf(doc.data(),Region.prototype);

      obj.key=doc.id;
      if(activo==null)
      d.push(obj);
      else{
        if(activo == obj.activo)d.push(obj);
      }

    })
    // for(let r of d){
    //   let objPersona=null;
    //   try{
    //     objPersona=await this.personaService.getPersonaById(r.key_persona);
    //     //objPersona=Object.setPrototypeOf(objPersona,Persona.prototype);
    //   }catch(er){}
    //   r.persona=objPersona;
    // }
    console.log("fin");
    return d;
  }
  async create(data:Region) {
    data.creado=new Date().toISOString();
    let copia=JSON.parse(JSON.stringify(data));
    //copia.persona=null;//quito persona para que no se guarde con la persona y sea referenciado siempre
    const docRef = await addDoc(collection(this.firestore, this.collection_name),
    copia);
    console.log(this.collection_name+" Document written with ID: ", docRef.id);
    return docRef.id;
  }
  async update(data:Region) {
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
  async getById(key:any){
    if(key==null)return null;
    let docc=await getDoc(doc(this.firestore, this.collection_name, key));
    let obj:Region=Object.setPrototypeOf(docc.data(),Region.prototype);
    obj.key=docc.id;
    return obj;
  }
}
