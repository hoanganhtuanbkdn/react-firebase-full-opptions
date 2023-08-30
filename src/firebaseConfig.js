// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAxmuEqLGSVSuWq_zF6VZ9VZtI2eJ3ObdQ',
	authDomain: 'react-firebase-learning-62f42.firebaseapp.com',
	projectId: 'react-firebase-learning-62f42',
	storageBucket: 'react-firebase-learning-62f42.appspot.com',
	messagingSenderId: '901466498759',
	appId: '1:901466498759:web:ea623d13ebabf382e440e2',
	measurementId: 'G-XKZVQRS74Q',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
