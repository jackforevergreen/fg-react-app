import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { BackButton, PageHeader } from "@/components/common";

export default function OffsetNowScreen() {
  return (
    <ScrollView style={styles.container}>
      <PageHeader
        subtitle="Offset your Emissions!"
        description="Reduce your climate impact in a few clicks"
      />
      <BackButton />
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reforestation</Text>
          <Text style={styles.sectionText}>
            One way to fight climate change is through supporting reforestation
            initiatives. Trees sequester carbon and are a great way to remove
            carbon directly from our atmosphere and improve biodiversity. By
            planting a tree you can build a forest and leave a lasting impact
            for decades to come. Choose to.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.navigate("/tree-planting")}
            >
              <Text style={styles.buttonText}>Plant a tree</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Monthly Tree Subscription</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Carbon Credit Subscription</Text>
          <Text style={styles.sectionText}>
            The Forevergreen carbon credit subscription includes the purchase of
            the nearest whole number of carbon credits to make sure you are net
            zero every month. This is the easiest way to reduce your impact on
            the planet and support awesome climate projects!
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.navigate("/carbon-credit")}
            >
              <Text style={styles.buttonText}>Buy a credit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Carbon Credit Subscription</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reduce with Habitual Changes</Text>
          <Text style={styles.sectionText}>
            If you want to reduce your emissions with habitual changes,
            subscribe to our newsletter to learn about habitual changes. This is
            a free and easy way to make small changes that can have massive
            impacts over time.
          </Text>
          <View style={styles.centeredButtonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Subscribe</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    padding: 24,
  },
  section: {
    backgroundColor: "#EEEEEE",
    borderRadius: 12,
    padding: 16,
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
  },
  centeredButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#409858",
    padding: 16,
    borderRadius: 9999,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
