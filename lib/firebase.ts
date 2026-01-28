import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBg-YNP3BbNNrMjZ7Z5ycGOSYU8H8SqnOk",
  authDomain: "tripping-968ad.firebaseapp.com",
  projectId: "tripping-968ad",
  storageBucket: "tripping-968ad.firebasestorage.app",
  messagingSenderId: "752668549827",
  appId: "1:752668549827:web:d193add30964833003b876",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
