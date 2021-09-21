/* import firebase from 'firebase'; */

import firebase from 'firebase/app';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyBEmtC61y45s1N0RpbHbqMhvSOp_hOIZdg",
    authDomain: "site-news-storage.firebaseapp.com",
    projectId: "site-news-storage",
    storageBucket: "site-news-storage.appspot.com",
    messagingSenderId: "408203993540",
    appId: "1:408203993540:web:1f40741c0792bb0e294491",
    measurementId: "G-QLS4LBJFN3"
  }
firebase.initializeApp(config);

export default firebase;