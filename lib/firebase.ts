import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {
  apiKey,
  appId,
  authDomain,
  messagingSenderId,
  projectId,
  storageBucket,
} from "@/config/firebase.config";

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
