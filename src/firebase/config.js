import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBnxJITmmONy3U-Db13Dulm-A0-QWzwuEw",
  authDomain: "reaction-825c5.firebaseapp.com",
  projectId: "reaction-825c5",
  storageBucket: "reaction-825c5.appspot.com",
  messagingSenderId: "876800398972",
  appId: "1:876800398972:web:f71589270659220bc75bf9"
};

//init firebase
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

export { projectFirestore, projectAuth, projectStorage }