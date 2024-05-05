import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-E7b99tIv5IjpX6Y2HZMhkied-T00wK8",
  authDomain: "resto-001.firebaseapp.com",
  projectId: "resto-001",
  storageBucket: "resto-001.appspot.com",
  messagingSenderId: "617603258511",
  appId: "1:617603258511:web:d3d2dd5fb7c10713ea78fa",
  measurementId: "G-5FMT32XDJB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);