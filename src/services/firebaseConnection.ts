import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDc9ad2YMJ8g_y7z8ATC-bR4BJzaxEj2pw",
  authDomain: "sul-utilitarios-formulario.firebaseapp.com",
  projectId: "sul-utilitarios-formulario",
  storageBucket: "sul-utilitarios-formulario.appspot.com",
  messagingSenderId: "1092747169054",
  appId: "1:1092747169054:web:0601d953e0560f6bc2cd0f",
  measurementId: "G-7GBPNRGG1E"
};

firebase.initializeApp(firebaseConfig)

export default firebase;