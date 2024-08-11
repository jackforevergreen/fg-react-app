import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, Pressable, View, StyleSheet } from "react-native";

const LearnScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.circle, styles.topLeftCircle]} />
        <View style={[styles.circle, styles.bottomRightCircle]} />

        <View style={styles.header}>
          <Text style={styles.titleText}>
            Forever<Text style={styles.greenText}>green</Text>
          </Text>
          <Text style={styles.subtitleText}>Learn</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resources Guides</Text>
          <Text style={styles.cardText}>
            Check out our resources guides with tons of info about how to live a
            more sustainable lifestyle!
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => router.push("https://www.forevergreen.earth/")}
          >
            <Text style={styles.buttonText}>Learn More</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Course</Text>
          <Text style={styles.cardText}>
            We have created some follow at your own pace courses about
            sustainable living!
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => router.push("https://www.forevergreen.earth/")}
          >
            <Text style={styles.buttonText}>Explore</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Blogs</Text>
          <Text style={styles.cardText}>
            We have tons of blogs about hot climate topics that are easy to read
            and educational!
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => router.push("https://www.forevergreen.earth/blog")}
          >
            <Text style={styles.buttonText}>Read Now</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Fast Facts</Text>
          <Text style={styles.cardText}>
            Want a quick fact about climate related topics to expand your view?
            Check out our fast facts now!
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => router.push("https://www.forevergreen.earth/")}
          >
            <Text style={styles.buttonText}>View</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Newsletter Subscription</Text>
          <Text style={styles.cardText}>
            By joining the newsletter you will be sent personalized info about
            your journey towards net-zero. This is a free an easy way to reduce
            your emissions.
          </Text>
          <Pressable
            style={styles.button}
            onPress={() =>
              router.push("https://www.forevergreen.earth/waitlist")
            }
          >
            <Text style={styles.buttonText}>Subscribe</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default LearnScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    padding: 24,
  },
  circle: {
    position: "absolute",
    width: 300,
    height: 300,
    backgroundColor: "#409858",
    borderRadius: 150,
  },
  topLeftCircle: {
    top: 150,
    left: -150,
  },
  bottomRightCircle: {
    top: 500,
    left: 300,
  },
  header: {
    alignItems: "center",
    marginTop: 32,
  },
  titleText: {
    fontSize: 48,
    fontWeight: "bold",
  },
  greenText: {
    color: "#409858",
  },
  subtitleText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#eeeeee",
    marginTop: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 8,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#409858",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 150,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
