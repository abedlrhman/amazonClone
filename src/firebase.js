import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGZvxKXXzo0xd-97dE6brd_4tpRiF97Pc",
  authDomain: "clone-3f17c.firebaseapp.com",
  projectId: "clone-3f17c",
  storageBucket: "clone-3f17c.appspot.com",
  messagingSenderId: "465749605876",
  appId: "1:465749605876:web:d115593617463d5f2a4da1",
  measurementId: "G-2N728BKK1B"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db , auth}