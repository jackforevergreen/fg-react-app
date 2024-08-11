import { Stack } from "expo-router";
import { EmissionsProvider } from "@/components/carbon-calculator";

export default function CarbonCalculatorLayout() {
  return (
    <EmissionsProvider>
      <Stack
        screenOptions={{
          // Hide the header for all other routes.
          headerShown: false,
        }}
      >
        <Stack.Screen name="pre-survey" />
        <Stack.Screen name="transportation" />
        <Stack.Screen name="diet" />
        <Stack.Screen name="energy" />
        <Stack.Screen name="breakdown" />
      </Stack>
    </EmissionsProvider>
  );
}
