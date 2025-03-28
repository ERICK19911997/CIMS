import { initializeApp } from "firebase/app";
import { getDatabase, get, ref, push, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBf0uet2nk5WKG53OnCckLfZOyJ9bsVjRo",
  authDomain: "cmis-65c77.firebaseapp.com",
  projectId: "cmis-65c77",
  databaseURL: "https://cmis-65c77-default-rtdb.firebaseio.com/",
  storageBucket: "cmis-65c77.firebasestorage.app",
  messagingSenderId: "86683546209",
  appId: "1:86683546209:web:8952b45cb07f7c33253020",
  measurementId: "G-N4PYDH17M6",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const database = getFirestore(app);
// export const db = getDatabase(app);
// export { ref, get, push, onValue, getFirestore };
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Initialize Realtime Database

export { database, ref, get, push, onValue };
