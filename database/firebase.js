import firebase from 'firebase';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD4fC4paAB2uu53LjMAMNqn5w8_5ld1T84",
  authDomain: "react-native-firebase-b0816.firebaseapp.com",
  projectId: "react-native-firebase-b0816",
  storageBucket: "react-native-firebase-b0816.appspot.com",
  messagingSenderId: "900676950576",
  appId: "1:900676950576:web:260c74acf46dfa7b45ebf5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
}