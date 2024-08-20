import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import "react-native-reanimated";
import { PaperProvider } from "react-native-paper";
import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { StripeProvider, useStripe } from "@/utils/stripe";
import { initializeFirebase } from "@/utils/firebaseConfig";

export default function RootLayout() {
  initializeFirebase();

  async function requestUserPermission(): Promise<boolean> {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
    return enabled;
  }

  const setupMessaging = async () => {
    const permissionGranted = await requestUserPermission();
    if (permissionGranted) {
      const token = await messaging().getToken();
      console.log("Token:" + token);
    } else {
      console.log("Permission not granted");
    }
  };

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    if (Platform.OS === "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
    } else if (Platform.OS === "ios") {
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

      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        if (remoteMessage.notification) {
          Alert.alert(
            remoteMessage.notification.title || "New Notification",
            remoteMessage.notification.body || "You have a new notification"
          );
        }
      });

      return unsubscribe;
    }
  }, [loaded]);

  const { handleURLCallback } = useStripe();

  const handleDeepLink = useCallback(
    async (url: string) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was not a Stripe URL - you can return or add extra handling here as you see fit
          // For example, you could use the URL to navigate to a specific screen in your app
          // router.push(url);
        }
      }
    },
    [handleURLCallback]
  );

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl || "");
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
      "url",
      (event: { url: string }) => {
        handleDeepLink(event.url);
      }
    );

    return () => {
      deepLinkListener.remove();
    };
  }, [handleDeepLink]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <StripeProvider
        publishableKey="pk_test_51Pch2uJNQHxtxrkGVjNCflMy3L4mKNxA76N3W7vyowpCgVtKsisTowCdORHOZjBYsPYhuukodKiGF6FBRpj6FJPD00H3lUT9fK"
        merchantIdentifier="merchant.com.fgdevteam.fgreactapp"
      >
        <Stack
          screenOptions={{
            // Hide the header for all other routes.
            headerShown: false,
          }}
        >
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="index" />
        </Stack>
      </StripeProvider>
    </PaperProvider>
  );
}
