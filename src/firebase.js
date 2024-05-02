// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "insta-next-e07d8.firebaseapp.com",
  projectId: "insta-next-e07d8",
  storageBucket: "insta-next-e07d8.appspot.com",
  messagingSenderId: "757047634766",
  appId: "1:757047634766:web:fda3548d1a253d7969cc1f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

/* service firebase.storage {
    match /b/{bucket}/o {
      match /{allPaths=**} {
        allow read;
        allow write: if
        request.resource.size < 2 * 1024 * 1024 && 
        request.resource.contentType.matches('image/.*')
      }
    }
  } */
