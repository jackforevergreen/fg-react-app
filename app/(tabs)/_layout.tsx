import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="carbon-credit"
        options={{
          tabBarLabel: "",
          tabBarActiveTintColor: "#409858",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#f4f4f4",
            paddingTop: 10,
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cash" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="tree-planting"
        options={{
          tabBarLabel: "",
          tabBarActiveTintColor: "#409858",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#f4f4f4",
            paddingTop: 10,
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="tree" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "",
          tabBarActiveTintColor: "#409858",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#f4f4f4",
            paddingTop: 10,
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          tabBarLabel: "",
          tabBarActiveTintColor: "#409858",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#f4f4f4",
            paddingTop: 10,
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="school" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-profile"
        options={{
          tabBarLabel: "",
          tabBarActiveTintColor: "#409858",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#f4f4f4",
            paddingTop: 10,
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
