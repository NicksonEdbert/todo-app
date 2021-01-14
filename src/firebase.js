import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVB39XnGsw-YH-4sT74gYSSQKT5lvG6Xk",
  authDomain: "todo-app-69ad7.firebaseapp.com",
  projectId: "todo-app-69ad7",
  storageBucket: "todo-app-69ad7.appspot.com",
  messagingSenderId: "34037673003",
  appId: "1:34037673003:web:2459fe7f6ee1e265988e6e",
  measurementId: "G-Q5DC6FS3KB",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default firebase;
export { db };
