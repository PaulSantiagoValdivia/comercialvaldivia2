import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) { }

  getItems(): Observable<any[]> {
    const itemCollection = collection(this.firestore, 'PERSONA');
    return collectionData(itemCollection);
  }

 addPerson(person: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        const personaCollection = collection(this.firestore, 'PERSONA');
        addDoc(personaCollection, person)
          .then(docRef => {
            console.log('Documento agregado con ID: ', docRef.id);
            resolve(docRef);
          })
          .catch(error => {
            console.error('Error al agregar documento: ', error);
            reject(error);
          });
      } catch (error) {
        console.error('Error al agregar documento: ', error);
        reject(error);
      }
    });
  }
}

