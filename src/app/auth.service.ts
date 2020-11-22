import {
    Injectable
} from '@angular/core';
import {
    Router
} from '@angular/router';
import {
    HttpClient
} from '@angular/common/http';
import {
    auth
} from 'firebase/app';

import {
    data as animals
} from "./animals.json";
import {
    AngularFireAuth
} from '@angular/fire/auth';
import {
    AngularFirestore,
    AngularFirestoreDocument
} from '@angular/fire/firestore';
import {
    firestore
} from 'firebase/app';
import {
    Observable,
    of
} from 'rxjs';
import {
    switchMap,
    first,
    map
} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user$: Observable < any > ;
    adjectives: string[];
    uid: string;
    displayName: string;
    userRef: AngularFirestoreDocument < any > ;
    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private httpClient: HttpClient

    ) {
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.afs.doc < any > (`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            })
        );
    }

    getUser() {
        return {
            uid: this.uid,
            displayName: this.displayName
        };
    }

    randomname() {


        var an = Math.floor(Math.random() * animals.length)

        return animals[an];




    }

    async anonymousLogin(location, radius, name, url) {

        console.log(url);
        var displayName = name.trim();
        if (displayName == "") {
            displayName = this.randomname();
        }
        console.log(displayName);
        const credential = await this.afAuth.signInAnonymously();
        this.afAuth.setPersistence(auth.Auth.Persistence.SESSION);
        this.userRef = this.afs.doc(`users/${credential.user.uid}`);
        this.uid = credential.user.uid;
        this.displayName = displayName;

        const data = {
            uid: credential.user.uid,

            displayName: displayName,

        };
        const collectiondata = {
            peopledone: 0,

            ready: false,
            start: false,
            uid: credential.user.uid,
            location: location,
            radius: radius,
            users: [{
                user: credential.user.uid,
                displayName: displayName
            }]

        };
        this.afs.collection(url.substring(1)).doc(credential.user.uid).set(collectiondata);
        this.router.navigate([url.substring(1) + '/' + credential.user.uid]);
        return this.userRef.set(data, {
            merge: true
        });
    }
    async anonymousLoginMovie(location, radius, name, url, code) {

        console.log(url);
        var displayName = name.trim();
        if (displayName == "") {
            displayName = this.randomname();
        }
        console.log(displayName);
        const credential = await this.afAuth.signInAnonymously();
        this.afAuth.setPersistence(auth.Auth.Persistence.SESSION);
        this.userRef = this.afs.doc(`users/${credential.user.uid}`);
        this.uid = credential.user.uid;
        this.displayName = displayName;

        const data = {
            uid: credential.user.uid,

            displayName: displayName,

        };
        const collectiondata = {
            code: code,

            peopledone: 0,
            ready: false,
            start: false,
            uid: credential.user.uid,
            location: location,
            radius: radius,
            users: [{
                user: credential.user.uid,
                displayName: displayName
            }]

        };
        this.afs.collection(url.substring(1)).doc(credential.user.uid).set(collectiondata);
        this.router.navigate([url.substring(1) + '/' + credential.user.uid]);
        return this.userRef.set(data, {
            merge: true
        });
    }

    // Login for users entering with a link
    async anonymousLoginno(name) {
        var displayName = name.trim();
        if (displayName == "") {
            displayName = this.randomname();
        }
        const credential = await this.afAuth.signInAnonymously();
        this.afAuth.setPersistence(auth.Auth.Persistence.SESSION);
        this.userRef = this.afs.doc(`users/${credential.user.uid}`);
        this.uid = credential.user.uid;
        this.displayName = displayName;
        const data = {
            uid: credential.user.uid,

            displayName: displayName,

        };

        var linklocation = "";
        var type = "";

        linklocation = this.router.url.split('/').pop();
        type = this.router.url.split('/')[1];
        console.log(type);
        this.afs.collection(type).doc(linklocation).update({
            users: firestore.FieldValue.arrayUnion({
                user: credential.user.uid,
                displayName: displayName
            })
        });
        return this.userRef.set(data, {
            merge: true
        });
    }


    async signOut() {



        await this.afAuth.signOut();


    }
}