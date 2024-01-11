import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAgojDuM4OS-FruM3jiHPYWShQf95PHgg8",
    authDomain: "codehub-7f3d8.firebaseapp.com",
    projectId: "codehub-7f3d8",
    storageBucket: "codehub-7f3d8.appspot.com",
    messagingSenderId: "151697555241",
    appId: "1:151697555241:web:b1cb3b5ee23f2a750e0138",
    measurementId: "G-4VT6K87847"
  };

const firebaseApp = initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider };
// export default db;
