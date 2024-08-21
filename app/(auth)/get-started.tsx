import React from "react";
import { View, Text, StatusBar, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { TreeLogo } from "@/constants/Images";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GetStartedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Forever<Text style={styles.titleHighlight}>green</Text>
        </Text>
        <Image style={styles.logo} source={TreeLogo} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.push("/signup")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already helping our planet? </Text>
          <TouchableOpacity
            onPress={() => router.push("/login")}
            style={styles.loginLink}
          >
            <Text style={styles.loginLinkText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 96,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
  },
  titleHighlight: {
    color: "#409858",
  },
  logo: {
    width: 768,
    height: 384,
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    backgroundColor: "#409858",
    borderRadius: 9999,
    padding: 24,
    paddingHorizontal: 48,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  loginContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "800",
  },
  loginLink: {
    marginRight: 32,
  },
  loginLinkText: {
    fontWeight: "800",
    textDecorationLine: "underline",
    fontSize: 20,
  },
});
