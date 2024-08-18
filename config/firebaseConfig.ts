import { initializeApp, getApps } from "firebase/app";
import { initializeAuth } from "firebase/auth";
// @ts-expect-error Some error with types in this import because of the versions
import { getReactNativePersistence } from "@firebase/auth/dist/rn/index.js";
import { initializeFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const initializeFirebase = () => {
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyBIvTUeN-I9FnCgz7d0ybhdWRpwsyFH0_s",
    authDomain: "fg-react-app.firebaseapp.com",
    databaseURL: "https://project-id.firebaseio.com",
    projectId: "fg-react-app",
    storageBucket: "fg-react-app.appspot.com",
    messagingSenderId: "489135632905",
    appId: "1:489135632905:web:20779662c09acf532a3ed8",
    measurementId: "G-TSS2FD4QBJ",
  };

  if (!getApps().length) {
    const app = initializeApp(firebaseConfig);
    initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
    initializeFirestore(app, {});
  }
};

export { initializeFirebase };
