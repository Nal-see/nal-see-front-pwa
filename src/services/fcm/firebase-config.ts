// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDMYtCoKQae2-FS1UZWG4mOxkhQlL9kSgs',
  authDomain: 'nal-see.firebaseapp.com',
  projectId: 'nal-see',
  storageBucket: 'nal-see.appspot.com',
  messagingSenderId: '4974077086',
  appId: '1:4974077086:web:425127726106e888f7078f',
  measurementId: 'G-F057P9WFMX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);
