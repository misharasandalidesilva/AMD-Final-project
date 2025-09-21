// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-THWwhpoTs73R8UfyRz3srVjKeu3nXPk",
  authDomain: "to-do-notification.firebaseapp.com",
  projectId: "to-do-notification",
  storageBucket: "to-do-notification.firebasestorage.app",
  messagingSenderId: "78820439964",
  appId: "1:78820439964:web:846ec81406e8222876ba59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export const auth =  getAuth(app);
export const db = getFirestore(app);