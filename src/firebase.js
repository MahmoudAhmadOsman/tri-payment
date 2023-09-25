// import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAdbu6o0ezK8heB84KcRHTurBxT3erY_68",
	authDomain: "tri-payment.firebaseapp.com",
	projectId: "tri-payment",
	storageBucket: "tri-payment.appspot.com",
	messagingSenderId: "429620220834",
	appId: "1:429620220834:web:ffd7af7ef39b526426d8fb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// const auth = getAuth(app);
// export { auth };
