
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getCountFromServer } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCSn-uUtIP2toFIf0diskjAZaXX1jQ13pw",
    authDomain: "style-sphere-95c19.firebaseapp.com",
    projectId: "style-sphere-95c19",
    storageBucket: "style-sphere-95c19.firebasestorage.app",
    messagingSenderId: "316334207780",
    appId: "1:316334207780:web:b462d821737c699c5d79b1",
    measurementId: "G-S755QKDV3T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function verify() {
    try {
        const coll = collection(db, "products");
        const snapshot = await getCountFromServer(coll);
        console.log(`Product count in Firestore: ${snapshot.data().count}`);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

verify();
