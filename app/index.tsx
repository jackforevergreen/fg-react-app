import { useRootNavigationState, Redirect, router } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";

// Initialize debugMode with useState
export default function Index() {
  const [debugMode, setDebugMode] = useState(true);
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  if (debugMode) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setDebugMode(false)} // Update debugMode state
        >
          <View style={styles.buttonContent}>
            <View style={styles.buttonLabel}>
              <Icon name="user" size={24} color="#FFF" />
              <Text style={styles.buttonText}>Regular App Flow</Text>
            </View>
            <Icon name="arrow-right" size={24} color="#FFF" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/_sitemap")}
        >
          <View style={styles.buttonContent}>
            <View style={styles.buttonLabel}>
              <Icon name="map" size={24} color="#FFF" />
              <Text style={styles.buttonText}>Sitemap</Text>
            </View>
            <Icon name="arrow-right" size={24} color="#FFF" />
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    // Implement regular app logic here
    return <Redirect href="/get-started" />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  button: {
    width: "80%",
    padding: 10,
    borderColor: "#1A1A1A",
    borderWidth: 2,
    borderRadius: 16,
    alignItems: "center",
    marginVertical: 12,
  },
  buttonContent: {
    padding: 12,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonLabel: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 24,
  },
});
