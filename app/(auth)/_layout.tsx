import { useEffect } from "react";
import { Stack } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function AuthLayout() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "489135632905-iu340mh7lub0iis2q18upvus42fa2roo.apps.googleusercontent.com",
    });
  }, []);
  
  return (
    <Stack
      screenOptions={{
        // Hide the header for all other routes.
        headerShown: false,
      }}
    >
      <Stack.Screen name="get-started" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="login" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
