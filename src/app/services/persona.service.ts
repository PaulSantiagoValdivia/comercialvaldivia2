import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
import { doc, getCountFromServer, limit, orderBy, startAfter, startAt, updateDoc, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})


export class PersonaService {

  collection_name="PERSONA";
  constructor(public firestore: Firestore) { }
  async createRobot(name: string, color: string, age: string) {
    const docRef = await addDoc(collection(this.firestore, 'robots'), {
      name: name,
      color: color,
      age: age
    });
    console.log("Document written with ID: ", docRef.id);
  }
  async create(name:any,lastname:any,phoneNumber:any,role:any,registerMobile:boolean,registerWeb:boolean,validate:boolean) {
    const docRef = await addDoc(collection(this.firestore, this.collection_name), {
      name:name?name:null, //si es undefined, le pone nulo automaticamente, firebase no permite asignar undefined
      lastname:lastname?lastname:null,
      phoneNumber:phoneNumber?phoneNumber:null,
      role:role?role:null,
      registerMobile:registerMobile?registerMobile:null,
      registerWeb:registerWeb?registerWeb:null,
      validate:validate?validate:null,
      creado:new Date().toISOString()
    });
    console.log("Persona Document written with ID: ", docRef.id);
  }
  async update(key:any,name:any,lastname:any,phoneNumber:any,role:any,registerMobile:boolean,registerWeb:boolean,validate:boolean) {
    let result=await updateDoc(doc(this.firestore, this.collection_name, key),{
      name:name?name:null,
      lastname:lastname?lastname:null,
      phoneNumber:phoneNumber?phoneNumber:null,
      role:role?role:null,
      registerMobile:registerMobile?registerMobile:null,
      registerWeb:registerWeb?registerWeb:null,
      validate:validate?validate:null,
    });
    console.log("Modificado correctamente: ",result);
    //updateDoc(collection(this.firestore, "PERSONA/"+key))
    // const docRef = await addDoc(collection(this.firestore, 'PERSONA'), {
    //   name,
    //   lastname,
    //   phoneNumber,
    //   role
    // });
    //console.log("Persona Document written with ID: ", docRef.id);
  }
  async getList(){
    //return await collection(this.firestore, 'PERSONA');
    // const q = query(collection(this.firestore, "PERSONA")
    // , where("capital", "==", true));
    const q = query(collection(this.firestore, this.collection_name));
    let result=await getDocs(q);
    let data:any=[]
    result.forEach((doc)=>{data.push(doc);})
    return data;
   // return await getDocs(q);
  }

 async buscar(filter_text:any){
  // Supongamos que quieres buscar nombres que comiencen con "Joh"

// Construir una expresión regular para buscar prefijos que coincidan con la búsqueda
const expresionRegular = new RegExp("^" + filter_text);

// Realizar la consulta
const q = query(collection(this.firestore, this.collection_name),
where("name", ">=", filter_text),
where("name", "<", filter_text + "\uf8ff")
);
let result=await getDocs(q);
let data:any=[]
result.forEach((doc)=>{
  console.log(doc.data());
  data.push(doc);})
return data;

 }

  async getListPaginate(current_page:any,size:any,filter_text:any){

    const coll = collection(this.firestore, this.collection_name);
    const snapshot = await getCountFromServer(coll);
    console.log('count: ', snapshot.data().count);

    let q=null;
    // Query the first page of docs
    try{

      const first = query(collection(this.firestore, this.collection_name),

      orderBy("name","desc"),
      limit(current_page*size),
      where("name", ">=", filter_text),
      where("name", "<", filter_text + "\uf8ff"),
   //   orderBy("creado","desc"),
      //orderBy('lastname','desc'),
    //  where("lastname", ">=", filter_text),
   //   where("lastname", "<", filter_text + "\uf8ff"),
      //orderBy('name','desc'),
      );

      //const first = query(collection(this.firestore, this.collection_name), orderBy("creado","desc"), limit(current_page*size));
    const documentSnapshots = await getDocs(first);

    // Get the last visible document
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
    console.log("last", lastVisible);
    // q=query(collection(this.firestore, this.collection_name),
    // orderBy("creado","desc"),
    // //orderByKey(),
    // startAfter(lastVisible),
    // //startAt(3),
    // limit(size));

    q = query(collection(this.firestore, this.collection_name),

      //orderBy('name','desc'),
      limit(size),
      orderBy('name','desc'),
      where("name", ">=", filter_text),
      where("name", "<", filter_text + "\uf8ff"),
     // where("lastname", ">=", filter_text),
     // where("lastname", "<", filter_text + "\uf8ff"),
      startAfter(lastVisible),
      //orderBy("creado","desc"),
      //orderBy('lastname','desc'),

      );

    }catch(error){
    //   q=query(collection(this.firestore, this.collection_name),
    //   orderBy("creado","desc"),
    //   //orderByKey(),
    // //  startAfter(lastVisible),
    //   //startAt(3),
    //   limit(size));

      q = query(collection(this.firestore, this.collection_name),

    //  startAfter(lastVisible),
      limit(size),
      orderBy('name','desc'),
      where("name", ">=", filter_text),
      where("name", "<", filter_text + "\uf8ff"),
    //  orderBy("creado","desc"),
      //where("lastname", ">=", filter_text),
      //where("lastname", "<", filter_text + "\uf8ff"),
      );
    }




    let result=await getDocs(q);
    let d:any={
      total_register:snapshot.data().count,
      data:[]};

    result.forEach((doc)=>{d.data.push(doc);})
    return d;

  }
}



