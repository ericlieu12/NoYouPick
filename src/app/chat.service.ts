import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { HtmlTagDefinition } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AuthService,
    private router: Router
  ) {}
  async remove(roomID,uid,name)
  { 
      this.firestore
      .collection<any>(this.getURL())
      .doc(roomID).update({
        "users": firestore.FieldValue.arrayRemove({"displayName": name, "user": uid})
      })
       return this.firestore
      .collection<any>('users')
      .doc(uid).delete();
  }
  getURL()
  {
    var url = this.router.url;
    
    url = url.substring(1).split("/")[0];
    return url;
  }
  get(roomID) {
    
    console.log(roomID);
    
    //returns data from google firebase firestore
    return this.firestore
      .collection<any>(this.getURL())
      .doc(roomID)
      .snapshotChanges()
      .pipe(
        map(doc => {

          return { id: doc.payload.id, ...doc.payload.data() as {}};
        })
      );
  }
  makeowner(roomID, uid) {
    //returns data from google firebase firestore
   return this.firestore
      .collection<any>(this.getURL())
      .doc(roomID).set({

   uid: uid
}, { merge: true });
  }
 
   update(roomID, index, arr, isDone) {
    
     
     if (isDone)
     {
  return this.firestore.collection<any>(this.getURL()).doc(roomID).set({
        ["groupScore"+(index-4)] : firestore.FieldValue.increment(arr[0]),
        ["groupScore"+(index-3)] : firestore.FieldValue.increment(arr[1]),
        ["groupScore"+(index-2)] : firestore.FieldValue.increment(arr[2]),
        ["groupScore"+(index-1)] : firestore.FieldValue.increment(arr[3]),
        ["groupScore"+(index-0)] : firestore.FieldValue.increment(arr[4]),
        peopledone : firestore.FieldValue.increment(1)
        }, { merge: true }); 
     }
    return this.firestore.collection<any>(this.getURL()).doc(roomID).set({
        ["groupScore"+(index-4)] : firestore.FieldValue.increment(arr[0]),
        ["groupScore"+(index-3)] : firestore.FieldValue.increment(arr[1]),
        ["groupScore"+(index-2)] : firestore.FieldValue.increment(arr[2]),
        ["groupScore"+(index-1)] : firestore.FieldValue.increment(arr[3]),
        ["groupScore"+(index-0)] : firestore.FieldValue.increment(arr[4]),
        }, { merge: true }); 
      
      }
    
    start(roomID) {
      //sets vairable to true
    return this.firestore.collection<any>(this.getURL()).doc(roomID).set({
 
    start: true
    }, { merge: true });
    }
  
}