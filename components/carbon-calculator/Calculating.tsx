import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const icons = ["hourglass-start", "hourglass-half", "hourglass-end"];

const CalculatingScreen = () => {
  const [iconIndex, setIconIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 1000); // Change icon every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.greenCircleLarge} />
      <View style={styles.greenCircleSmall} />

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          Forever<Text style={styles.titleHighlight}>green</Text>
        </Text>
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>Calculating your result</Text>
        <View style={styles.iconContainer}>
          <Icon name={icons[iconIndex]} size={100} color="#409858" />
        </View>
      </View>
    </View>
  );
};

export default CalculatingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
  },
  greenCircleLarge: {
    position: "absolute",
    width: 300,
    height: 300,
    backgroundColor: "#409858",
    borderRadius: 150,
    bottom: -8,
    right: "-25%",
  },
  greenCircleSmall: {
    position: "absolute",
    width: 200,
    height: 200,
    backgroundColor: "#409858",
    borderRadius: 100,
    top: -32,
    left: "-25%",
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 128,
  },
  titleText: {
    fontSize: 48,
    fontWeight: "bold",
    marginVertical: 8,
  },
  titleHighlight: {
    color: "#409858", // Assuming this is your primary color
  },
  resultContainer: {
    marginTop: 160,
  },
  resultText: {
    fontSize: 36,
    marginTop: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  iconContainer: {
    marginTop: 200,
    alignSelf: "center",
  },
});
