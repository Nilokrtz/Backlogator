import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


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

const appBanco = initializeApp(firebaseConfigBanco);
const analytics = getAnalytics(appBanco);