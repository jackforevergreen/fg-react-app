import { Stack } from "expo-router";

export default function AuthLayout() {
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
