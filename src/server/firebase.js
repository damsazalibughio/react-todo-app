
import firebase from "firebase/app";
import 'firebase/firestore';

let firebaseApp = firebase.initializeApp({
 
});


var db = firebaseApp.firestore();


export{ db }
