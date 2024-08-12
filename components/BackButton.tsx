import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";

export default function BackButton() {
  return (
    <TouchableOpacity style={styles.container} onPress={() => router.back()}>
      <Icon name="arrow-left" size={18} color="black" />
      <Text style={styles.text}>Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingTop: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginLeft: 8,
  },
});
