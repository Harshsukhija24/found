import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDIZhTOk-TXsol8xFTri-OrpwsOEahmKIE",
  authDomain: "found-335c6.firebaseapp.com",
  projectId: "found-335c6",
  databaseURL: "https://found-335c6-default-rtdb.firebaseio.com",
  storageBucket: "found-335c6.appspot.com",
  messagingSenderId: "260720408797",
  appId: "1:260720408797:web:875de2d73a469f9aa20334",
  measurementId: "G-0KNGQ179FW",
};

const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined" && isSupported()) {
  analytics = getAnalytics(app);
}
const database = getDatabase(app);

export { app, analytics, database };
