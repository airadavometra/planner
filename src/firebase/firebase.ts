import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4VV3eG0F--91QCZqNCzTqvrcCWwy9lP0",
  authDomain: "planner-be8a5.firebaseapp.com",
  projectId: "planner-be8a5",
  storageBucket: "planner-be8a5.appspot.com",
  messagingSenderId: "482578395011",
  appId: "1:482578395011:web:2d8a280b3b030b132210b6",
  measurementId: "G-J0B6MT54LM",
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();

export default app;
