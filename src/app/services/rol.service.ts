import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore';

import { Rol } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  collection_name="ROLES";
  constructor(public firestore: Firestore) { }

  async getList(){
    const q = query(collection(this.firestore, this.collection_name));
    let result=await getDocs(q);
    let d:any=[];
    result.forEach((doc)=>{
      d.push(doc);

    })
    return d;
  }
  async getList2(){
    const q = query(collection(this.firestore, this.collection_name));
    let result=await getDocs(q);
    let d:Rol[]=[];
    result.forEach((doc)=>{
      let obj:Rol=Object.setPrototypeOf(doc.data(),Rol.prototype);
      obj.key=doc.id;
      d.push(obj);
    })
    return d;
  }
  async create(rol:Rol) {
    rol.creado=new Date().toISOString();
    const docRef = await addDoc(collection(this.firestore, this.collection_name), rol);
    console.log(this.collection_name+" Document written with ID: ", docRef.id);
  }
  async update(rol:Rol) {
    let obj={}
    obj=JSON.parse(JSON.stringify(rol));
    console.log("update",obj);
    let result=await updateDoc(doc(this.firestore, this.collection_name, String(rol.key)),
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

  async getListByUserRole(userRole: string){
    const q = query(collection(this.firestore, this.collection_name), where("nombre", "==", userRole));
    const result = await getDocs(q);
    let d: Rol[] = [];
    result.forEach((doc) => {
      let obj: Rol = Object.setPrototypeOf(doc.data(), Rol.prototype);
      obj.key = doc.id;
      d.push(obj);
    })
    return d;
  }

}
