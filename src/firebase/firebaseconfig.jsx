// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { setPersistence, browserLocalPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCION4gldRlEgISWgJBst3RszWUfpSUaUw",
  authDomain: "lmspis.firebaseapp.com",
  projectId: "lmspis",
  storageBucket: "lmspis.firebasestorage.app",
  messagingSenderId: "674585430385",
  appId: "1:674585430385:web:01e7248db91b123a214ed0",
  measurementId: "G-25J9RNFY3N"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Set persistence to LOCAL (keeps user logged in across browser restarts)
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Failed to set persistence:", error);
  });

export { auth };