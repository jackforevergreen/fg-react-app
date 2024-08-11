import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";
// todo: replace fetchEmissionsData with the calculate emissions data function (not written yet)
import { fetchEmissionsData } from "@/api/emissions";
import {
  PieChartBreakdown,
  BarChartBreakdown,
  EarthBreakdown,
} from "@/components/breakdown";
import CalculatingScreen from "@/components/carbon-calculator/Calculating";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Breakdown() {
  const [emissionsPerYear, setEmissionsPerYear] = useState(0.0);
  const emissionsPerMonth = emissionsPerYear / 12;
  const [transportationEmissions, setTransportationEmissions] = useState(0.0);
  const [dietEmissions, setDietEmissions] = useState(0.0);
  const [energyEmissions, setEnergyEmissions] = useState(0.0);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchEmissionsData();
      if (data) {
        const totalData = data.totalData;
        setEmissionsPerYear(totalData.totalEmissions);
        setTransportationEmissions(totalData.transportationEmissions);
        setDietEmissions(totalData.dietEmissions);
        setEnergyEmissions(totalData.energyEmissions);
      } else if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount((prevCount) => prevCount + 1);
        }, 1000 * (retryCount + 1));
      }
    };

    loadData();
  }, [retryCount]);

  const screenWidth = Dimensions.get("window").width;

  const [isAnonymous, setIsAnonymous] = useState(false);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAnonymous(user.isAnonymous);
      }
    });

    // Rest of your existing useEffect code...

    return () => unsubscribe();
  }, [retryCount]);

  if (!emissionsPerYear) {
    return <CalculatingScreen />;
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            size={24}
            color="black"
            onPress={() => router.back()}
          />
          <Text style={styles.headerTitle}>Results</Text>
        </View>

        <View style={styles.contentContainer}>
          {/* Carbon Footprint */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your Carbon Footprint</Text>
            <Text>Your total emissions are:</Text>
            <Text style={styles.greenText}>
              {emissionsPerYear.toFixed(2)} tons co2/year
            </Text>
            <Text>Your total monthly emissions are:</Text>
            <Text style={styles.greenText}>
              {emissionsPerMonth.toFixed(2)} tons co2/month
            </Text>
          </View>

          {/* Emission Breakdown */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your Emission Breakdown</Text>
            <View style={{ alignItems: "center", marginBottom: 16 }}>
              <PieChartBreakdown
                names={["Transportation", "Diet", "Energy"]}
                values={[
                  transportationEmissions,
                  dietEmissions,
                  energyEmissions,
                ]}
                colors={["#44945F", "#AEDCA7", "#66A570"]}
                height={220}
                width={screenWidth}
              />
            </View>
            <View style={styles.legendContainer}>
              {[
                { name: "Transportation", color: "#44945F" },
                { name: "Diet", color: "#AEDCA7" },
                { name: "Energy", color: "#66A570" },
              ].map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendColor,
                      { backgroundColor: item.color },
                    ]}
                  />
                  <Text>{item.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Average American */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>You vs the Average American</Text>
            <View style={styles.legendContainer}>
              {[
                { name: "You", color: "#44945F" },
                { name: "Average American", color: "#A9A9A9" },
              ].map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendColor,
                      { backgroundColor: item.color },
                    ]}
                  />
                  <Text>{item.name}</Text>
                </View>
              ))}
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BarChartBreakdown
                names={["You", "Average American"]}
                values={[emissionsPerYear, 21]}
                colors={["#44945F", "#A9A9A9"]}
              />
            </View>
          </View>

          {/* Earth Breakdown */}
          <View style={styles.card}>
            <Text style={styles.earthBreakdownTitle}>Earth Breakdown</Text>
            <Text style={styles.earthBreakdownText}>
              If everyone lived like you we would need{" "}
              {(emissionsPerYear / 6.4).toFixed(2)} Earths!
            </Text>
            <EarthBreakdown emissions={emissionsPerYear} />
          </View>

          {/* Call to Action */}
          <View style={styles.card}>
            <Text style={styles.ctaTitle}>
              Help us help you change the World 🌍
            </Text>
            <Text style={styles.ctaText}>
              Support green projects around the world!
            </Text>

            <TouchableOpacity
              onPress={() => {
                if (isAnonymous) {
                  router.push("/signup");
                } else {
                  router.push("/offset-now");
                }
              }}
              style={styles.ctaButton}
            >
              <Text style={styles.ctaButtonText}>Learn More</Text>
            </TouchableOpacity>
            <Text style={styles.ctaText}>
              Build your legacy and leave a lasting impact by planting your own
              forest.
            </Text>

            <TouchableOpacity
              onPress={() => {
                if (isAnonymous) {
                  router.push("/signup");
                } else {
                  router.replace("/tree-planting");
                }
              }}
              style={styles.ctaButton}
            >
              <Text style={styles.ctaButtonText}>Start the Pledge today!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Next Button */}
      <View style={styles.nextButton}>
        <TouchableOpacity
          onPress={() => {
            if (isAnonymous) {
              router.push("/signup");
            } else {
              router.replace("/home");
            }
          }}
        >
          <View style={styles.nextButtonInner}>
            <Icon name="arrow-right" size={30} color={"#000"} />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    padding: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    columnGap: 24,
  },
  headerTitle: {
    fontSize: 36,
    marginTop: 4,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 8,
  },
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 12,
    backgroundColor: "white",
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  greenText: {
    color: "#16a34a",
    fontSize: 20,
    marginBottom: 8,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  legendColor: {
    height: 16,
    width: 16,
    marginRight: 8,
  },
  earthBreakdownTitle: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  earthBreakdownText: {
    marginBottom: 16,
    fontSize: 18,
  },
  ctaTitle: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  ctaText: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 18,
  },
  ctaButton: {
    borderRadius: 9999,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: "#44945F",
  },
  ctaButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  nextButton: {
    alignItems: "flex-end",
    marginBottom: 40,
    marginRight: 40,
  },
  nextButtonInner: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 9999,
    borderWidth: 2,
    height: 64,
    width: 64,
    borderColor: "black",
    backgroundColor: "#AEDCA7",
    justifyContent: "center",
    alignItems: "center",
  },
});
