import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBvs_Khgc0DADRpeZT1KZrES20EQEb9Ul4",
  authDomain: "lavenshop-c9862.firebaseapp.com",
  projectId: "lavenshop-c9862",
  storageBucket: "lavenshop-c9862.appspot.com",
  messagingSenderId: "413018619021",
  appId: "1:413018619021:web:cd6bfba92ca7d9f7eaf6c4",
  measurementId: "G-9LQFMMPVWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firebase_storage = getStorage(app);
