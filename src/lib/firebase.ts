import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR_BWC2va3oJJC6ajP6-rNMCmbEVhcdrA",
  authDomain: "achupride-260e7.firebaseapp.com",
  projectId: "achupride-260e7",
  storageBucket: "achupride-260e7.appspot.com",
  messagingSenderId: "1013395909334",
  appId: "1:1013395909334:web:6c7bb7f9c677cb69063777"
};

// Log configuration without sensitive data
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase Config:', {
    ...firebaseConfig,
    apiKey: '***' // Mask API key in logs
  });
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, 'us-central1');

export default app; 