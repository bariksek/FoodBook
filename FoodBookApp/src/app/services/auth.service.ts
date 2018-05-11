import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  currentUserEmail: string;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router
  ) { }

  registerUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }
  loginUserByTwitter() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }
  loginUserByEmail(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }
  loginUserByGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  loginUserByFacebook() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }
  getAuth() {
    return this.afAuth.authState.map(auth => auth);
  }

  currentUser(email) {
    this.currentUserEmail = email;
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}

