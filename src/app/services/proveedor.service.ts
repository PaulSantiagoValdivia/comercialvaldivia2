import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';
import { Rol } from '../models/rol.model';
import { Proveedor } from '../models/proveedor.model';
import { PersonaService } from './persona.service';
import { Persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  collection_name="PROVEEDOR";
  constructor(public firestore: Firestore, private personaService:PersonaService) { }


  async getList(){
    const q = query(collection(this.firestore, this.collection_name));
    let result=await getDocs(q);
    let d:Proveedor[]=[];
   // await getDoc(doc(this.firestore, "cities", "2l3bcSGs2vZBIc3RODwp"));
    result.forEach((doc)=>{
      console.log("foreach")
      let obj:Proveedor=Object.setPrototypeOf(doc.data(),Proveedor.prototype);

      obj.key=doc.id;
      d.push(obj);

    })
    for(let r of d){
      let objPersona=null;
      try{
        objPersona=await this.personaService.getPersonaById(r.key_persona);
        //objPersona=Object.setPrototypeOf(objPersona,Persona.prototype);
      }catch(er){}
      r.persona=objPersona;
    }
    console.log("fin");
    return d;
  }
  async create(data:Proveedor) {
    data.creado=new Date().toISOString();
    //const id_persona=await this.personaService.create(null,null,null,null,true,true,true);
   // let copia:Proveedor=Object.setPrototypeOf(data,Proveedor.prototype);//copio
    let copia=JSON.parse(JSON.stringify(data));
    copia.persona=null;//quito persona para que no se guarde con la persona y sea referenciado siempre
    const docRef = await addDoc(collection(this.firestore, this.collection_name),
    copia);
    console.log(this.collection_name+" Document written with ID: ", docRef.id);
    return docRef.id;
  }
  async update(data:Proveedor) {
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
}
