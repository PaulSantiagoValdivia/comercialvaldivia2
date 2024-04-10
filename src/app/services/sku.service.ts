import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';
import { Sku } from '../models/sku.model';
import { log } from 'console';
@Injectable({
  providedIn: 'root'
})
export class SkuService {
  collection_name = "SKU";

  constructor(public firestore: Firestore) { }

  async getList(activo=null) {
    const q = query(collection(this.firestore, this.collection_name));
    const result = await getDocs(q);
    let d: Sku[] = [];
    result.forEach((doc) => {
      let obj:Sku=Object.setPrototypeOf(doc.data(), Sku.prototype);
      obj.key=doc.id;
      if(activo==null)
        d.push(obj);
        else{
          if(activo == obj.activo)d.push(obj);
        }
      })
      console.log("fin");
      return d;
    }

  async create(data:Sku) {
    data.creado = new Date().toISOString();

    let copia=JSON.parse(JSON.stringify(data));
    console.log(copia);

    const docRef = await addDoc(collection(this.firestore, this.collection_name),
    copia);

    console.log(this.collection_name+" Document written with ID: ", docRef.id);
    return docRef.id;
  }

  async update(data:Sku) {
    let obj = JSON.parse(JSON.stringify(data));
    console.log("update", obj);
    let result = await updateDoc(doc(this.firestore, this.collection_name, String(data.key)), obj);
    console.log("Modificado correctamente: ", result);
  }

  async delete(key: any, delet?: boolean) {
    let result = await updateDoc(doc(this.firestore, this.collection_name, key), {
      activo: delet ? delet : false,
    });
    console.log("Eliminado correctamente: ", result, "delete: ", delet);
  }

  async getById(key: any) {
    if (key == null) return null;
    let docc=await getDoc(doc(this.firestore, this.collection_name, key));
     let obj:Sku= Object.setPrototypeOf(docc.data(), Sku.prototype);
     obj.key=docc.id;
     return obj;
  }
}
