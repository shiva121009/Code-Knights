import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmcY9PlS4TdfE2LKHbBnrOkh6zciro6mQ",
  authDomain: "code-knights-59885.firebaseapp.com",
  projectId: "code-knights-59885",
  storageBucket: "code-knights-59885.appspot.com",
  messagingSenderId: "420267592463",
  appId: "1:420267592463:web:50256b334ccfabdf8ecc7a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
