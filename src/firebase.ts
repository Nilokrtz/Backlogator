// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkuYmflpxdeDNmLIWWF5EKSE0PkBcdzeo",
  authDomain: "ies-projeto-dados.firebaseapp.com",
  projectId: "ies-projeto-dados",
  storageBucket: "ies-projeto-dados.firebasestorage.app",
  messagingSenderId: "942398121960",
  appId: "1:942398121960:web:06a132d070c39c8c49e65d",
  measurementId: "G-R5PJYTFH2S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export { app, analytics };