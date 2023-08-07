// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDPwDr3i0sstOO3g0jHAxD12Qy7NmG3eUE",
    authDomain: "lbfa-d349b.firebaseapp.com",
    projectId: "lbfa-d349b",
    storageBucket: "lbfa-d349b.appspot.com",
    messagingSenderId: "231284583434",
    appId: "1:231284583434:web:1f1c297555cd14fc1e03f3",
    measurementId: "G-VV1SZVYL1B"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage= getStorage(app)
