import {initializeApp,cert,getApps} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";

const raw=process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
const uid=process.env.ADMIN_UID;
if(!raw||!uid){throw new Error("Set FIREBASE_SERVICE_ACCOUNT_JSON and ADMIN_UID before running.");}
const serviceAccount=JSON.parse(raw);
const app=getApps()[0]||initializeApp({credential:cert(serviceAccount)});
const auth=getAuth(app);
const user=await auth.getUser(uid);
await auth.setCustomUserClaims(uid,{...(user.customClaims||{}),admin:true});
console.log("Admin claim set for UID:",uid);
console.log("User must sign out and sign in again (or refresh ID token) for claims to update.");
