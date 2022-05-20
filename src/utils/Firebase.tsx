// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt9fFVnJqW0ay1GEFGVFd_YrkwAJic1II",
  authDomain: "s15-todo-react-app.firebaseapp.com",
  projectId: "s15-todo-react-app",
  storageBucket: "s15-todo-react-app.appspot.com",
  messagingSenderId: "854274043579",
  appId: "1:854274043579:web:b752436af8bdb32580039e",
  measurementId: "G-PP9KT38BXV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
