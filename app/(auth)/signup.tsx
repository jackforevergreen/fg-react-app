import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { router } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { onSignup, onGoogleSignUp, onContinueAnonymously } from "@/api/auth";
import { TreeLogo } from "@/constants/Images";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const { height } = useWindowDimensions();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "489135632905-iu340mh7lub0iis2q18upvus42fa2roo.apps.googleusercontent.com",
    });

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAnonymous(user.isAnonymous);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={[styles.contentContainer, { minHeight: height }]}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>
                Sign <Text style={styles.titleHighlight}>Up</Text>
              </Text>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={TreeLogo}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  placeholder="Ex. abc@example.com"
                  style={styles.input}
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
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Your Name</Text>
                <TextInput
                  placeholder="Ex. John Smith"
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  mode="outlined"
                  dense={true}
                  outlineStyle={{ borderColor: "#000" }}
                  theme={{ roundness: 9999, colors: { background: "#fff" } }}
                  textColor="#000"
                  left={
                    <TextInput.Icon
                      icon="account"
                      color="#000"
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
                  style={styles.input}
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
              <TouchableOpacity
                style={styles.createAccountButton}
                onPress={() => onSignup(email, password, name)}
              >
                <Text style={styles.createAccountButtonText}>
                  Create Account
                </Text>
              </TouchableOpacity>
              <View style={styles.orContainer}>
                <View style={styles.orLine} />
                <Text style={styles.orText}>Or</Text>
                <View style={styles.orLine} />
              </View>
              <TouchableOpacity
                style={styles.googleButton}
                onPress={() => onGoogleSignUp()}
              >
                <Image
                  source={{
                    uri: "https://img.icons8.com/color/48/000000/google-logo.png",
                  }}
                  style={styles.googleIcon}
                />
                <Text style={styles.googleButtonText}>
                  Continue with Google
                </Text>
              </TouchableOpacity>
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>
                  Already helping our planet?
                </Text>
                <TouchableOpacity onPress={() => router.navigate("/login")}>
                  <Text style={styles.loginLink}>Log In</Text>
                </TouchableOpacity>
              </View>
              {isAnonymous ? (
                <View style={styles.anonymousContainer}>
                  <Text style={styles.anonymousText}>
                    Create an account to save your progress, access all
                    features, and continue making a real impact on the
                    environment!
                  </Text>
                </View>
              ) : (
                <View style={styles.guestContainer}>
                  <TouchableOpacity onPress={() => onContinueAnonymously()}>
                    <Text style={styles.guestLink}>Or continue as guest</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: -1,
    marginBottom: 20,
  },
  titleHighlight: {
    color: "#409858",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 320,
    height: 160,
  },
  formContainer: {
    gap: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    marginBottom: 8,
  },
  input: {
    width: "100%",
  },
  createAccountButton: {
    backgroundColor: "#409858",
    borderRadius: 9999,
    padding: 16,
    marginTop: 32,
    borderWidth: 1,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  createAccountButtonText: {
    color: "#fff",
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
    backgroundColor: "black",
  },
  orText: {
    paddingHorizontal: 16,
    color: "black",
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
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
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
  loginContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  loginText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  loginLink: {
    textDecorationLine: "underline",
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  anonymousContainer: {
    marginTop: 16,
  },
  anonymousText: {
    textAlign: "center",
    fontSize: 18,
    color: "#4a4a4a",
  },
  guestContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  guestLink: {
    textDecorationLine: "underline",
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
});
