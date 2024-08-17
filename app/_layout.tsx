import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { PaperProvider } from "react-native-paper";
import { initializeApp, getApps } from "firebase/app";
import { initializeAuth } from "firebase/auth";
// @ts-expect-error Some error with types in this import because of the versions
import { getReactNativePersistence } from "@firebase/auth/dist/rn/index.js";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";

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
  getFirestore(app);
}

// import Purchases, { LOG_LEVEL } from "react-native-purchases";
// import { Platform } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  if (Platform.OS === 'android') {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  }

  async function requestUserPermission(): Promise<boolean> {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
    return enabled;
  }

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    
    if (Platform.OS === 'android' || Platform.OS === 'ios') {

      const setupMessaging = async () => {
        const permissionGranted = await requestUserPermission();
        if (permissionGranted) {
          const token = await messaging().getToken();
          console.log(token);
        } else {
          console.log("Permission not granted");
        }
      };
      setupMessaging();

      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(async (remoteMessage) => {
          if (remoteMessage) {
            console.log(
              "Notification caused app to open from quit state:",
              remoteMessage.notification
            );
          }
        });

      // Assume a message-notification contains a "type" property in the data payload of the screen to open
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log(
          "Notification caused app to open from background state:",
          remoteMessage.notification
        );
      });

      // Register background handler
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log("Message handled in the background!", remoteMessage);
      });

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        if (remoteMessage.notification) {
          Alert.alert(
            remoteMessage.notification.title || 'New Notification',
            remoteMessage.notification.body || 'You have a new notification'
          );
        }
      });

      return unsubscribe;
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
