import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCZhwfCR4iULBXTAHtuI5MCAgR5oAx602s",
  authDomain: "admin-crud-menu.firebaseapp.com",
  databaseURL: "https://admin-crud-menu-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "admin-crud-menu",
  storageBucket: "admin-crud-menu.appspot.com",
  messagingSenderId: "956496172333",
  appId: "1:956496172333:web:37eaee989747625977afa4",
  measurementId: "G-6F0BET9GK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app