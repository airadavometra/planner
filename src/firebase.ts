import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account ",
});
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export default app;
