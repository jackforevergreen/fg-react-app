import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
// import "react-native-reanimated";
import { PaperProvider } from "react-native-paper";
// import Purchases, { LOG_LEVEL } from "react-native-purchases";
import Head from "expo-router/head";

// Import your global CSS file
// import "../global.css";
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
    <>
      <Head>
        <link href="/public/global.css" rel="stylesheet" />
      </Head>
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
    </>
  );
}
