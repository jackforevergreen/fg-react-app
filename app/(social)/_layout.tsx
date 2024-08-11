import { Stack } from "expo-router";

export default function SocialLayout() {
  return (
    <Stack
      screenOptions={{
        // Hide the header for all other routes.
        headerShown: false,
      }}
    >
      <Stack.Screen name="friends/[uid]" />
      <Stack.Screen name="profile/[uid]" />
    </Stack>
  );
}
