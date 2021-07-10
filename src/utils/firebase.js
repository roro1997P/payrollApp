import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDeQ2R-VrV6dSjoeWV_MWuP1HoudlsTHjQ",
    authDomain: "payroll-manager-b60ce.firebaseapp.com",
    projectId: "payroll-manager-b60ce",
    storageBucket: "payroll-manager-b60ce.appspot.com",
    messagingSenderId: "430759865215",
    appId: "1:430759865215:web:f357fe87851cd868b3084a"
};

firebase.initializeApp(firebaseConfig);

// Utils
const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();

// Exports
export {
    auth,
    storage,
    db,
};