// Import necessary libraries and components
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  // Alert,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
// import axios from "axios";

const ReferralForm = () => {
  // Define state variables to hold the input values
  const [friendName, setFriendName] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [note, setNote] = useState("");

  // Function to handle the referral form submission
  // const handleReferral = async () => {
  //   try {
  //     // Send a POST request to the Flask backend to send an email
  //     const res = await axios.post("http://<YOUR_MACHINE_IP>:5000/send-email", {
  //       to: friendEmail,
  //       subject: "Help the earth! Join Forevergreen today!",
  //       content:
  //         "Your friend " +
  //         friendName +
  //         " has referred you to join Forevergreen, a platform that helps you track your carbon footprint and make a positive impact on the environment. " +
  //         friendName +
  //         " says: " +
  //         note +
  //         " Sign up today to start your journey to a greener future!",
  //     });

  //     // Show a success alert if the email was sent successfully
  //     Alert.alert("Success", "Referral sent successfully!");

  //     // Clear input fields after successful send
  //     setFriendName("");
  //     setFriendEmail("");
  //     setNote("");
  //   } catch (error) {
  //     // Show an error alert if the email sending failed
  //     Alert.alert("Error", "Failed to send referral.");
  //   }
  // };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.greenCircle1} />
          <View style={styles.greenCircle2} />

          <View style={styles.header}>
            <Text style={styles.title}>
              Forever<Text style={styles.greenText}>green</Text>
            </Text>
            <Text style={styles.subtitle}>Refer a Friend</Text>
            <Text style={styles.description}>
              Help the Cause Today by Referring a Friend
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Refer a Friend</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Enter Your Friend's Name Below:
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Your Answer"
                value={friendName}
                onChangeText={setFriendName}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Enter Your Friend's Email Address Below:
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Your Answer"
                value={friendEmail}
                onChangeText={setFriendEmail}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Enter a Note or Leave Blank:
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Your Answer"
                value={note}
                onChangeText={setNote}
              />
            </View>
            <Pressable style={styles.submitButton} 
            // onPress={handleReferral}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ReferralForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    padding: 24,
  },
  greenCircle1: {
    position: "absolute",
    width: 300,
    height: 300,
    backgroundColor: "#409858",
    borderRadius: 150,
    top: 200,
    left: 200,
  },
  greenCircle2: {
    position: "absolute",
    width: 200,
    height: 200,
    backgroundColor: "#409858",
    borderRadius: 100,
    bottom: 100,
    right: 300,
  },
  header: {
    alignItems: "center",
    marginTop: 32,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
  },
  greenText: {
    color: "#409858",
  },
  subtitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  description: {
    fontSize: 20,
    marginTop: 8,
  },
  formContainer: {
    backgroundColor: "#eeeeee",
    marginTop: 32,
    padding: 16,
    borderRadius: 24,
  },
  formTitle: {
    fontSize: 36,
    marginTop: 8,
    fontWeight: "bold",
  },
  inputContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "white",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  submitButton: {
    marginTop: 16,
    marginHorizontal: 90,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: "#409858",
    borderRadius: 9999,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});
