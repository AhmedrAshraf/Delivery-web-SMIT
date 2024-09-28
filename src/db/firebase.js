import {
  ref,
  getStorage,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import {
  doc,
  query,
  where,
  getDoc,
  addDoc,
  limit,
  setDoc,
  orderBy,
  getDocs,
  Timestamp,
  deleteDoc,
  updateDoc,
  onSnapshot,
  collection,
  getFirestore,
  getCountFromServer,
} from "firebase/firestore";
import {
  signOut,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDywJu-C39zs85CMyWdSG0nm0nwJNHK01Q",
  authDomain: "login-smit.firebaseapp.com",
  projectId: "login-smit",
  storageBucket: "login-smit.appspot.com",
  messagingSenderId: "1058827475679",
  appId: "1:1058827475679:web:02bd7025021bbbe344a76a"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  uploadBytesResumable,
  GoogleAuthProvider,
  getCountFromServer,
  getDownloadURL,
  uploadBytes,
  onSnapshot,
  collection,
  updateDoc,
  deleteDoc,
  Timestamp,
  database,
  storage,
  getDocs,
  signOut,
  orderBy,
  setDoc,
  getDoc,
  addDoc,
  limit,
  query,
  where,
  auth,
  doc,
  ref,
};
