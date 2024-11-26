import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwfiICRwEQrvb2ra2dRiTnqzXFZhP2_T4",
  authDomain: "notes-app-6b807.firebaseapp.com",
  projectId: "notes-app-6b807",
  storageBucket: "notes-app-6b807.firebasestorage.app",
  messagingSenderId: "872937509818",
  appId: "1:872937509818:web:82f23d107cf183539d8383"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  db,
  auth
}
