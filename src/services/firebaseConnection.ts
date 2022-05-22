import * as firebase from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore/lite';
import 'firebase/firestore';
import { getStorage, ref, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  firebase,
  db,
  uploadBytes,
  storage,
  ref,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteObject,
  getDownloadURL,
  updateDoc,
  deleteDoc,
  getAuth,
  signInWithEmailAndPassword
}