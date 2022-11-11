import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBair6cJOyooqPvDnE1BITryr4KOKI5K0w",
    authDomain: "my-cheat-001.firebaseapp.com",
    projectId: "my-cheat-001",
    storageBucket: "my-cheat-001.appspot.com",
    messagingSenderId: "988193412415",
    appId: "1:988193412415:web:416e1dca11cd4ec6a7ef8a",
    measurementId: "G-VGGV5F116H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
