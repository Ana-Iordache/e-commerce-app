// After creating an app in firebase you have to add the following configuration in 'auth.js':
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id"
};

function initilizeFirebase() {
    initializeApp(firebaseConfig);
}

export default initilizeFirebase;