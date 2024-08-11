import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { PaperProvider } from "react-native-paper";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
// @ts-expect-error Some error with types in this import because of the versions
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);

// import Purchases, { LOG_LEVEL } from "react-native-purchases";
// import { Platform } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  //   useEffect(() => {
  //     const setup = async () => {
  //       if (Platform.OS === "android") {
  //         await Purchases.configure({
  //           apiKey: "goog_lNxsUrbWohfeSKDEuwoJGBGtlIy",
  //         });
  //       } else {
  //         await Purchases.configure({
  //           apiKey: "appl_ZuRqSmehWozCJjjIbGrcZxQuCpi",
  //         });
  //       }
  //       Purchases.setLogLevel(LOG_LEVEL.DEBUG);
  //     };

  //     setup().catch(console.log);
  //   }, []);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          // Hide the header for all other routes.
          headerShown: false,
        }}
      >
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="index" />
      </Stack>
    </PaperProvider>
  );
}
