import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { router } from "expo-router";

export const BackButton = () => {
  return (
    <Pressable style={styles.container} onPress={() => router.back()} hitSlop={24}>
      <Icon name="chevron-left" size={18} color="black" />
      <Text style={styles.text}>Back</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingTop: 72,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginLeft: 4,
  },
});
