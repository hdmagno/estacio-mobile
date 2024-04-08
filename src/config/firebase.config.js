import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIwVqDsxvuxOQf9phH79TsK-ypTZHQauQ",
  authDomain: "produtos-estacio-mobile.firebaseapp.com",
  projectId: "produtos-estacio-mobile",
  storageBucket: "produtos-estacio-mobile.appspot.com",
  messagingSenderId: "492373027728",
  appId: "1:492373027728:web:7216923eda071ea8bae115"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;