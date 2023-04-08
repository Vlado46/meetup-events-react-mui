import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4t2YEfhdBYcm8X257dIZqiUX8PH-QZTA",
  authDomain: "meetup-events-react-mui.firebaseapp.com",
  projectId: "meetup-events-react-mui",
  storageBucket: "meetup-events-react-mui.appspot.com",
  messagingSenderId: "37390529743",
  appId: "1:37390529743:web:309f18ad26090e8c81f3ba",
  measurementId: "G-C7T9NWJ8NT",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
