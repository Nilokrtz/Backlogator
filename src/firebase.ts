// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// App de Autenticação
const firebaseConfigAuth = {
  apiKey: "AIzaSyAkuYmflpxdeDNmLIWWF5EKSE0PkBcdzeo",
  authDomain: "ies-projeto-dados.firebaseapp.com",
  projectId: "ies-projeto-dados",
  storageBucket: "ies-projeto-dados.firebasestorage.app",
  messagingSenderId: "942398121960",
  appId: "1:942398121960:web:06a132d070c39c8c49e65d",
  measurementId: "G-R5PJYTFH2S"
};

// App Banco de Dados
const firebaseConfigBanco = {
  apiKey: "AIzaSyAgu2ey9cpYtPtO5WcnfGAm0leWB9cc1mo",
  authDomain: "ies-projeto-dados-f305e.firebaseapp.com",
  databaseURL: "https://ies-projeto-dados-f305e-default-rtdb.firebaseio.com",
  projectId: "ies-projeto-dados-f305e",
  storageBucket: "ies-projeto-dados-f305e.firebasestorage.app",
  messagingSenderId: "295105706259",
  appId: "1:295105706259:web:f0a097c396103aa8cf42e6",
  measurementId: "G-0WLGH1RGWN"
};

// Initialize Firebase
const appAuth = initializeApp(firebaseConfigAuth);
const appBanco = initializeApp(firebaseConfigBanco, "database-app");
const analytics = getAnalytics(appAuth);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(appAuth);
export const realtimeDb = getDatabase(appBanco);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(appAuth);

export { appAuth, appBanco, analytics };