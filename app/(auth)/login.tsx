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
import { Link, router } from "expo-router";
import { onLogin, onGoogleLogin } from "@/api/auth";
import { TreeLogo } from "@/constants/Images";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <SafeAreaView style={styles.safeAreaView}>
          <Text style={styles.title}>
            Log <Text style={styles.titleHighlight}>in</Text>
          </Text>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={TreeLogo}
            />
          </View>
          <View style={styles.formContainer}>
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
                    color={"#000"}
                    style={{ height: "100%", width: "100%" }}
                  />
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Your Password</Text>
              <TextInput
                placeholder="Your Password"
                secureTextEntry={!showPassword}
                style={styles.textInput}
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                dense={true}
                outlineStyle={{ borderColor: "#000" }}
                theme={{ roundness: 9999, colors: { background: "#fff" } }}
                textColor="#000"
                left={
                  <TextInput.Icon
                    icon="lock"
                    color="#000"
                    style={{ height: "100%", width: "100%" }}
                  />
                }
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                    color="#000"
                    style={{ height: "100%", width: "100%" }}
                  />
                }
              />
            </View>
            <View style={styles.forgotPasswordContainer}>
              <Link href="/forgot-password">
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </Link>
            </View>
            <TouchableOpacity
              onPress={() => onLogin(email, password)}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>
            <View style={styles.orContainer}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>Or</Text>
              <View style={styles.orLine} />
            </View>
            <TouchableOpacity
              onPress={() => {
                onGoogleLogin();
              }}
              style={styles.googleButton}
            >
              <Image
                source={{
                  uri: "https://img.icons8.com/color/48/000000/google-logo.png",
                }}
                style={styles.googleIcon}
              />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
            <View style={styles.signUpContainer}>
              <TouchableOpacity onPress={() => router.navigate("/signup")}>
                <Text style={styles.signUpText}>Back to Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingBottom: 64,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: -1,
    marginVertical: 40,
  },
  titleHighlight: {
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
    marginTop: 24,
    paddingHorizontal: 48,
    rowGap: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    marginBottom: 8,
  },
  textInput: {
    width: "100%",
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  forgotPasswordText: {
    fontSize: 18,
    fontWeight: "normal",
    textDecorationLine: "underline",
    marginTop: 8,
  },
  loginButton: {
    backgroundColor: "#409858",
    borderRadius: 9999,
    padding: 16,
    marginTop: 32,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  loginButtonText: {
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
  googleButton: {
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
  googleIcon: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
  googleButtonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  signUpText: {
    fontSize: 20,
    fontWeight: "800",
    textDecorationLine: "underline",
  },
});
