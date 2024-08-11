import { useState } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { router } from "expo-router";
import { handleResetPassword } from "@/api/auth";
import { TreeLogo } from "@/constants/Images";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <SafeAreaView style={styles.safeAreaView}>
          {/* Header */}
          <Text style={styles.header}>
            Reset <Text style={styles.headerHighlight}>Password</Text>
          </Text>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={TreeLogo} />
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Email Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                placeholder="Ex. abc@example.com"
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                dense={true}
                outlineStyle={{ borderColor: "#000" }}
                theme={{ roundness: 9999, colors: { background: "#fff" } }}
                textColor="#000"
                left={
                  <TextInput.Icon
                    icon="at"
                    color="#000"
                    style={{ height: "100%", width: "100%" }}
                  />
                }
              />
            </View>

            {/* Info */}
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                By clicking the "Reset Password" button you'll receive an email
                with a link to create a new password. This helps to ensure your
                account remains secure and accessible to you.
              </Text>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controlsContainer}>
            {/* Reset password button */}
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => handleResetPassword(email)}
            >
              <Text style={styles.resetButtonText}>Reset Password</Text>
            </TouchableOpacity>

            {/* Or */}
            <View style={styles.orContainer}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>Or</Text>
              <View style={styles.orLine} />
            </View>

            {/* Back to Log in button */}
            <TouchableOpacity
              style={styles.backToLoginButton}
              onPress={() => router.push("/login")}
            >
              <Text style={styles.backToLoginText}>Back to Log in</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: -1,
    marginVertical: 40,
  },
  headerHighlight: {
    color: "#409858",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 320,
    height: 160,
  },
  formContainer: {
    rowGap: 16,
    paddingHorizontal: 48,
    marginTop: 24,
  },
  inputContainer: {
    position: "relative",
  },
  inputLabel: {
    marginBottom: 8,
  },
  textInput: {
    width: "100%",
  },
  infoContainer: {
    marginTop: 16,
    padding: 8,
  },
  infoText: {
    lineHeight: 24,
  },
  controlsContainer: {
    paddingHorizontal: 48,
    marginTop: 24,
  },
  resetButton: {
    backgroundColor: "#409858",
    borderRadius: 9999,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  resetButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#191C19",
  },
  orText: {
    marginHorizontal: 16,
    fontWeight: "bold",
    fontSize: 20,
  },
  backToLoginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 9999,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  backToLoginText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
