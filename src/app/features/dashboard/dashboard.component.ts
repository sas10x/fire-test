import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection, FirestoreInstances, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FirebaseApp } from 'firebase/app';
import { FirebaseApps } from '@angular/fire/app';
import { StorageInstances, Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { concatMap, first } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Item {
  name: string
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private pokemonCollection: CollectionReference<DocumentData>;
  item$: Observable<any[]>;
  data: Observable<any[]>;
  constructor(
    private authService: AuthService, 
    private router: Router,
    private firestore: Firestore,
    private allFirestoreInstances: FirestoreInstances,
    private storage: Storage,                    
    private allStorageInstances: StorageInstances, 
  ) {
    this.pokemonCollection = collection(this.allFirestoreInstances[1], 'map');
  }

  ngOnInit(): void {
    // const data = collection(this.firestore, 'products');
    // this.item$ = collectionData(data);
    // this.item$.subscribe(x => console.log(x));
    // this.getCourseList().subscribe(x => console.log(x));
    this.getAll().subscribe(x => console.log(x));
    // this.getFiles();
  }

  // getCourseList() {
  //   return this.angularFirestore.collection('products').snapshotChanges();
  // }

  getAll() {
    return collectionData(this.pokemonCollection) as Observable<any[]>;
  }

  getFiles() {
    const storage = this.allStorageInstances[1];
    getDownloadURL(ref(storage, 'images/object_decoration_t'))
    .then((url) => {
      console.log(url)
    })
  }

  // getFiles() {
  //   const fooData = firestoreInstance$.pipe(
  //     first(),
  //     concatMap(firestore => collectionData(collection(firestore, 'products'))),);
  //   console.log(fooData);
  // }

  logout() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message));
  }
}
