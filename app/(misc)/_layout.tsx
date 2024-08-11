import { Stack } from "expo-router";

export default function MiscLayout() {
  return (
    <Stack
      screenOptions={{
        // Hide the header for all other routes.
        headerShown: false,
      }}
    >
      <Stack.Screen name="referral" />
      <Stack.Screen name="plant-a-tree" />
      <Stack.Screen name="search" />
    </Stack>
  );
}
