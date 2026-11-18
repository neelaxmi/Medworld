import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
// Public web configuration only. Never place Admin SDK credentials in browser code.
const firebaseConfig = { apiKey:"AIzaSyD-ChcGDOYoUfhzyk-qQAwfQUiIC2PYLv0",authDomain:"dsfss-67702.firebaseapp.com",databaseURL:"https://dsfss-67702-default-rtdb.firebaseio.com",projectId:"dsfss-67702",storageBucket:"dsfss-67702.firebasestorage.app",messagingSenderId:"50112594074",appId:"1:50112594074:web:35333793f635e299d85f23" };
const app=initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);