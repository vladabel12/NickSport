import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCf_5jLejvVoaxAtujdzBySkIvAv0lnf28",
  authDomain: "nicksport-74bf4.firebaseapp.com",
  projectId: "nicksport-74bf4",
  storageBucket: "nicksport-74bf4.firebasestorage.app",
  messagingSenderId: "544127419769",
  appId: "1:544127419769:web:6fc8ad2b7fb509c1c65ba8",
  measurementId: "G-QXGHH9RJGF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
