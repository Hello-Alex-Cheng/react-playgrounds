// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrq00d-p8qm7SVbZYzZlkz3iJuhFXae2s",
  authDomain: "react-firebase-learning-c08af.firebaseapp.com",
  projectId: "react-firebase-learning-c08af",
  storageBucket: "react-firebase-learning-c08af.appspot.com",
  messagingSenderId: "160293532513",
  appId: "1:160293532513:web:1f1666e0914113f8780b20",
  measurementId: "G-791417ZPQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
 