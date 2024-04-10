import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class SkuService {
  collection_name = "SKU";

  constructor(public firestore: Firestore) { }

  async getList() {
    const q = query(collection(this.firestore, this.collection_name));
    const result = await getDocs(q);
    let skus: any[] = [];
    result.forEach((doc) => {
      let skuData = doc.data();
      let sku: any = Object.setPrototypeOf(skuData, Object.prototype);
      sku.key = doc.id;
      skus.push(sku);
    });
    return skus;
  }

  async create(data: any) {
    data.creado = new Date().toISOString();
    const docRef = await addDoc(collection(this.firestore, this.collection_name), data);
    console.log(this.collection_name + " Document written with ID: ", docRef.id);
    return docRef.id;
  }

  async update(data: any) {
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
    let docc = await getDoc(doc(this.firestore, this.collection_name, key));
    let skuData = docc.data();
    let sku: any = Object.setPrototypeOf(skuData, Object.prototype);
    sku.key = docc.id;
    return sku;
  }
}
