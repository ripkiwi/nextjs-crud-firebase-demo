import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAtwq-4FwRylxMayHK5gIZitelDjMwmmY0",
  authDomain: "nextjs-demo-17ba3.firebaseapp.com",
  projectId: "nextjs-demo-17ba3",
  storageBucket: "nextjs-demo-17ba3.firebasestorage.app",
  messagingSenderId: "96899448031",
  appId: "1:96899448031:web:6185bec1169a8908bb3d6a",
  measurementId: "G-70DK237HNY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };