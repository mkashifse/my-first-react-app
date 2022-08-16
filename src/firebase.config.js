import { getFirestore } from "firebase/firestore"; // db service
import { getStorage } from "firebase/storage"; // storage service
import { getAuth } from "firebase/auth"; // atuh service

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI5xdflatnkksOzvTfQLnYOUOXzfp8N0U",
  authDomain: "myinsta-5093a.firebaseapp.com",
  projectId: "myinsta-5093a",
  storageBucket: "myinsta-5093a.appspot.com",
  messagingSenderId: "220789634791",
  appId: "1:220789634791:web:53239783f3946c51969442",
  measurementId: "G-WWJ5M6VT2L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
