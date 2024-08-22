import { Link, Stack } from "expo-router";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { fourofour } from "@/constants/Images";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text style={styles.errorCode}>404</Text>
        <Text style={styles.errorMessage}>Page Not Found</Text>
        <Image 
          source={fourofour} style={styles.image}
        />
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Link href="/" style={styles.link}>
            <Text style={styles.buttonText}>Back Home</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  errorCode: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#6DB08B",
  },
  errorMessage: {
    fontSize: 24,
    fontWeight: "500",
    color: "#000000",
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#6DB08B",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    textDecorationLine: "none",
  },
});