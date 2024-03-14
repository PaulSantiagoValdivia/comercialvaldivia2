import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {doc, collection, getDoc, getDocs, query } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  collection_name="PROVEEDOR";
  constructor(public firestore: Firestore) { }
  async getList(){
    console.log("Entroasdasdasd");
    const q = query(collection(this.firestore, this.collection_name));
    let result=await getDocs(q);

    //ejemplo para traer persona by proveedor PRUEBAA
    // let docRef:any = doc(this.firestore, "PROVEEDOR/yyHZDrplstEMyJJtNmSs ");
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // docSnap.data() will be undefined in this case
    //   console.log("No such document!");
    // }


    let d:any=[];
    result.forEach((doc)=>{
       if(doc.data()['key_persona']){
        //console.log("Tiene key persona")
        // si tiene key persona, hay que traer el objeto persona en el doc, y asignarlo en su data()
       // doc.data()['persona']=await this.getPersonaByKey(doc.data()['key_persona']);
       }
      d.push(doc);
    })
    return d;
  }
  async getPersonaByKey(key:any){
    return {}
  }
}
