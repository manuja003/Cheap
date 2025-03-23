import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6nSg9PW0yqKuRpa2b2PiUx6EDTTppjhg",
  authDomain: "cheapchaser-fc687.firebaseapp.com",
  projectId: "cheapchaser-fc687",
  storageBucket: "cheapchaser-fc687.firebasestorage.app",
  messagingSenderId: "355602095885",
  appId: "1:355602095885:web:d6423c2f681906874dda44",
  measurementId: "G-L1N6BD5FK4"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

export default app; 