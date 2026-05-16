
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// App de Autenticação
const firebaseConfigAuth = {
  apiKey: import.meta.env.VITE_APP_API_KEY_AUTH,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN_AUTH,
  projectId: import.meta.env.VITE_APP_PROJECT_ID_AUTH,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET_AUTH,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID_AUTH,
  appId: import.meta.env.VITE_APP_APP_ID_AUTH,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID_AUTH
};

//App de Banco de Dados
const firebaseConfigBanco = {
  apiKey: import.meta.env.VITE_APP_API_KEY_BANCO,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN_BANCO,
  databaseURL: import.meta.env.VITE_APP_DATABASE_URL_BANCO,
  projectId: import.meta.env.VITE_APP_PROJECT_ID_BANCO,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET_BANCO,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID_BANCO,
  appId: import.meta.env.VITE_APP_APP_ID_BANCO,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID_BANCO
};

const appAuth = initializeApp(firebaseConfigAuth);
const appBanco = initializeApp(firebaseConfigBanco, "database-app");
const analytics = getAnalytics(appAuth);

export const auth = getAuth(appAuth);
export const realtimeDb = getDatabase(appBanco);

export const db = getFirestore(appAuth);

export { appAuth, appBanco, analytics };