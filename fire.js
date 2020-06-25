import firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "./config/Config";

class Fire {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.firestoreRef = firebase.firestore;
    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
  }
}

module.exports = new Fire();
