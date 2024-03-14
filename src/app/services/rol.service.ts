import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs, query } from 'firebase/firestore';

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
    result.forEach((doc)=>{d.push(doc);})
    return d;
  }
}
