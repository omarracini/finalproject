// Import the functions you need from the SDKs you need
import { initializeApp, firebase } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfliG40ybd0KWmshs5c7lU6pMei65PJSM",
  authDomain: "final-proyect-y.firebaseapp.com",
  projectId: "final-proyect-y",
  storageBucket: "final-proyect-y.appspot.com",
  messagingSenderId: "2625075956",
  appId: "1:2625075956:web:ab5b19f067fad40d227ca1"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB   = getFirestore(FirebaseApp)

