// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, set, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAIOUh8Jb5KpaRf8zJq7LBAxpdoAlYq1w8",
  authDomain: "confess-note-1252a.firebaseapp.com",
  databaseURL: "https://confess-note-1252a-default-rtdb.firebaseio.com",
  projectId: "confess-note-1252a",
  storageBucket: "confess-note-1252a.appspot.com",
  messagingSenderId: "61233196256",
  appId: "1:61233196256:web:3f5b0f47d743b4f5ccf485",
  measurementId: "G-C822YP43T1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get a reference to the database service
const database = getDatabase(app);

export { database, set, ref, onValue };
