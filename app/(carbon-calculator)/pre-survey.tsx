import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const PreSurveyScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.circleBottom} />
      <View style={styles.circleTop} />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Forever<Text style={styles.titleHighlight}>green</Text>
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>Welcome!</Text>
        <Text style={styles.contentText}>
          Before we begin, we'll ask you a few quick questions about your
          transportation, diet, and energy use to help calculate your carbon
          footprint. Completing this survey will give you personalized tips to
          reduce your impact on the environment.
        </Text>
        <TouchableOpacity
          onPress={() => router.navigate("/transportation")}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Begin Survey</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PreSurveyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
  },
  circleBottom: {
    position: "absolute",
    width: 300,
    height: 300,
    backgroundColor: "#409858",
    borderRadius: 150,
    bottom: -300,
    left: -150,
  },
  circleTop: {
    position: "absolute",
    width: 200,
    height: 200,
    backgroundColor: "#409858",
    borderRadius: 100,
    top: -100,
    right: -50,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 96,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginVertical: 8,
  },
  titleHighlight: {
    color: "#409858", // Assuming this is your primary color
  },
  contentContainer: {
    backgroundColor: "#eeeeee",
    padding: 16,
    borderRadius: 24,
    marginTop: 96,
  },
  contentTitle: {
    fontSize: 36,
    marginTop: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  contentText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 16,
  },
  button: {
    marginTop: 32,
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: "#409858",
    borderRadius: 9999,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});
