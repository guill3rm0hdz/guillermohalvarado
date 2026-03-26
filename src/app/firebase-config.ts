import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfLrOqUE5AURs3V7WDECDGm028H9YX9Lk",
  authDomain: "guillermohalvarado.firebaseapp.com",
  projectId: "guillermohalvarado",
  storageBucket: "guillermohalvarado.firebasestorage.app",
  messagingSenderId: "1086916368571",
  appId: "1:1086916368571:web:680964a32e1735ac9a719e",
  measurementId: "G-D94XQLQ2XK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser)
export const analyticsPromise = isSupported().then(yes => yes ? getAnalytics(app) : null);
