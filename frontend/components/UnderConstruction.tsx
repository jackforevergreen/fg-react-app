import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import BackButton from "./BackButton";

const UnderConstructionScreen = () => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.content}>
        <Icon name={"construct"} size={50} style={styles.image} />
        <Text style={styles.title}>Under Construction</Text>
        <Text style={styles.subtitle}>
          We're working hard to bring you an amazing new experience. Please
          check back soon!
        </Text>
        <Progress.Bar
          progress={0.5}
          width={null}
          color="#409858"
          unfilledColor="#C7C7E0"
          borderWidth={0}
          height={15}
          style={[styles.progressBar, { width: screenWidth * 0.8 }]}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  content: {
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#181818",
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressBar: {
    display: "flex",
  },
});

export default UnderConstructionScreen;
