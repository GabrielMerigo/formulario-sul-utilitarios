import * as firebase from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, doc, addDoc } from 'firebase/firestore/lite';
import 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDc9ad2YMJ8g_y7z8ATC-bR4BJzaxEj2pw",
  authDomain: "sul-utilitarios-formulario.firebaseapp.com",
  projectId: "sul-utilitarios-formulario",
  storageBucket: "sul-utilitarios-formulario.appspot.com",
  messagingSenderId: "1092747169054",
  appId: "1:1092747169054:web:0601d953e0560f6bc2cd0f",
  measurementId: "G-7GBPNRGG1E"
};

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  db,
  uploadBytes,
  storage,
  ref,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc
}