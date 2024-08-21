import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton, PageHeader } from "@/components/common";

const SubscriptionDetailsItem = ({
  icon,
  text,
}: {
  icon: "time-outline" | "calendar-outline" | "receipt-outline" | undefined;
  text: string;
}) => (
  <View style={styles.detailsItem}>
    <Ionicons name={icon} size={24} color="#666" />
    <Text style={styles.detailsText}>{text}</Text>
  </View>
);

const ForevergreenSubscriptionDetails = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.greenCircleLarge} />
        <View style={styles.greenCircleSmall} />
        <PageHeader
          subtitle="Manage Subscriptions"
          description="Choose a subscription to reduce your environmental impact"
        />
        <BackButton />

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tree Planting Subscription</Text>
            <Text style={styles.cardDescription}>
              The Forevergreen tree planting subscription includes 1 tree
              planted on our reforestation projects. We will populate your
              forest with all the relevant data and credit the carbon
              sequestered to you. Build a forest and a sustainable future with a
              consistent effort.
            </Text>
            <View style={styles.subscribedContainer}>
              <Ionicons name="checkmark-circle" size={24} color="#409858" />
              <Text style={styles.subscribedText}>Subscribed</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Subscription Details</Text>
            <SubscriptionDetailsItem
              icon="time-outline"
              text="Payment due on May 1, 2024"
            />
            <SubscriptionDetailsItem
              icon="calendar-outline"
              text="Ends on May 31, 2024"
            />
            <SubscriptionDetailsItem
              icon="receipt-outline"
              text="Billed Monthly"
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <View style={styles.paymentMethod}>
              <Ionicons name="card-outline" size={24} color="#666" />
              <Text style={styles.paymentText}>Axis card</Text>
              <Text style={styles.paymentCardNumber}>xxxx xxxx 0101</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel Subscription</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  greenCircleLarge: {
    position: "absolute",
    width: 300,
    height: 300,
    backgroundColor: "#409858",
    borderRadius: 150,
    bottom: "15%",
    right: "-35%",
  },
  greenCircleSmall: {
    position: "absolute",
    width: 300,
    height: 300,
    backgroundColor: "#409858",
    borderRadius: 9999,
    top: "25%",
    left: "-25%",
  },
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  subscribedContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subscribedText: {
    marginLeft: 5,
    color: "#409858",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailsItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailsText: {
    marginLeft: 10,
    fontSize: 16,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentText: {
    marginLeft: 10,
    fontSize: 16,
  },
  paymentCardNumber: {
    marginLeft: "auto",
    fontSize: 16,
    color: "#666",
  },
  cancelButton: {
    backgroundColor: "#ffcccb",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "stretch",
    marginTop: 20,
  },
  cancelButtonText: {
    color: "#ff0000",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});

export default ForevergreenSubscriptionDetails;
