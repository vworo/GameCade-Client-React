import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCdja8VUFjMP-l1Ic8PNMu3KN7KT1n3pdU",
    authDomain: "gamecade-react.firebaseapp.com",
    projectId: "gamecade-react",
    storageBucket: "gamecade-react.appspot.com",
    messagingSenderId: "14656921507",
    appId: "1:14656921507:web:814ada9ee2746e525c4416",
    measurementId: "G-BM4FR36ZR8"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };