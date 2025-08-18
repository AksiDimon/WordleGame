import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBDJsvZEPBxUtnTvSxOlAwT3Bvi0_hWvMA",
//   authDomain: "wordle-aeac2.firebaseapp.com",
//   projectId: "wordle-aeac2",
//   storageBucket: "wordle-aeac2.firebasestorage.app",
//   messagingSenderId: "144733587350",
//   appId: "1:144733587350:web:067515878a9e3db82ebfb7"
// };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence).catch(console.error);

export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
