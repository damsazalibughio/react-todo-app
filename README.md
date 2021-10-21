To run App on local development you need to include your own firebase SDK kit.

import firebase from "firebase/app";
import 'firebase/firestore';

let firebaseApp = firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
});

var db = firebaseApp.firestore();

export{ db }
