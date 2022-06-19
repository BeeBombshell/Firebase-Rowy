import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCyHN6Zax_u4ObBQnF60ql9Enn_ApC5RdQ",
    authDomain: "fir-rowy-2fae4.firebaseapp.com",
    projectId: "fir-rowy-2fae4",
    storageBucket: "fir-rowy-2fae4.appspot.com",
    messagingSenderId: "779387366655",
    appId: "1:779387366655:web:01ed43b5247b04ed4630ca",
    measurementId: "G-JSSSMDXS1X"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)