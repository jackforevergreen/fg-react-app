import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { fetchEmissionsData } from "@/api/emissions";
import dayjs from "dayjs";
import {
  PieChartBreakdown,
  BarChartBreakdown,
  EarthBreakdown,
  LineChartBreakdown,
} from "@/components/breakdown";

const TextButton = ({ label, style }: { label: string; style: object }) => (
  <View style={[styles.textButton, style]}>
    <Text style={styles.textButtonLabel}>{label}</Text>
  </View>
);

const HomeScreen = () => {
  const { width } = useWindowDimensions();
  const [emissionsPerYear, setEmissionsPerYear] = useState(0.0);
  const [transportationEmissions, setTransportationEmissions] = useState(0.0);
  const [dietEmissions, setDietEmissions] = useState(0.0);
  const [energyEmissions, setEnergyEmissions] = useState(0.0);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchEmissionsData();
      if (data !== null) {
        const totalData = data.totalData;
        setEmissionsPerYear(totalData.totalEmissions);
        setTransportationEmissions(totalData.transportationEmissions);
        setDietEmissions(totalData.dietEmissions);
        setEnergyEmissions(totalData.energyEmissions);
      }
    };

    loadData();
  }, []);

  // Generate a list of 6 months ago to now
  const months = [];

  for (let i = 0; i < 6; i++) {
    months.push(dayjs().subtract(i, "month").format("YYYY-MM"));
  }
  months.reverse();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Forever<Text style={styles.headerGreen}>green</Text>
          </Text>
        </View>

        {/* Fast Fact */}
        <View style={styles.fastFact}>
          <Text style={styles.fastFactTitle}>
            Forevergreen Fast Fact of the Day
          </Text>
          <Text style={styles.fastFactText}>
            Turning off the tap while brushing your teeth can save up to 8
            gallons of water a day, over 2900 gallons of water a year!
          </Text>
        </View>

        {/* Carbon Footprint and Calculator */}
        <View style={styles.footprintContainer}>
          <TouchableOpacity
            style={styles.footprintBox}
            onPress={() => router.push("/breakdown")}
          >
            <Text style={styles.boxTitle}>Your Carbon Footprint</Text>
            <Text style={styles.boxLargeText}>
              {Math.min(emissionsPerYear, 99.9).toFixed(1)}
            </Text>
            <Text style={styles.boxMediumText}>Tons of CO2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.calculatorBox}
            onPress={() => router.push("/pre-survey")}
          >
            <Text style={styles.boxTitle}>Calculate your impact</Text>
            <Pressable style={styles.calculator}>
              {/* Calculator buttons */}
              <>
                <View style={styles.calculatorRow}>
                  <TextButton label="AC" style={styles.grayButton} />
                  <TextButton
                    label="+/-"
                    style={[styles.grayButton, styles.marginLeft]}
                  />
                  <TextButton
                    label="%"
                    style={[styles.grayButton, styles.marginLeft]}
                  />
                  <TextButton
                    label="/"
                    style={[styles.greenButton, styles.marginLeft]}
                  />
                </View>
                <View style={styles.calculatorRow}>
                  <TextButton label="7" style={styles.darkButton} />
                  <TextButton
                    label="8"
                    style={[styles.darkButton, styles.marginLeft]}
                  />
                  <TextButton
                    label="9"
                    style={[styles.darkButton, styles.marginLeft]}
                  />
                  <TextButton
                    label="X"
                    style={[styles.greenButton, styles.marginLeft]}
                  />
                </View>
                <View style={styles.calculatorRow}>
                  <TextButton label="4" style={styles.darkButton} />
                  <TextButton
                    label="5"
                    style={[styles.darkButton, styles.marginLeft]}
                  />
                  <TextButton
                    label="6"
                    style={[styles.darkButton, styles.marginLeft]}
                  />
                  <TextButton
                    label="-"
                    style={[styles.greenButton, styles.marginLeft]}
                  />
                </View>
                <View style={styles.calculatorRow}>
                  <TextButton label="1" style={styles.darkButton} />
                  <TextButton
                    label="2"
                    style={[styles.darkButton, styles.marginLeft]}
                  />
                  <TextButton
                    label="3"
                    style={[styles.darkButton, styles.marginLeft]}
                  />
                  <TextButton
                    label="+"
                    style={[styles.greenButton, styles.marginLeft]}
                  />
                </View>
                <View style={styles.calculatorRow}>
                  <TextButton
                    label="0"
                    style={[styles.darkButton, styles.wideButton]}
                  />
                  <TextButton
                    label="."
                    style={[styles.darkButton, styles.marginLeft]}
                  />
                  <TextButton
                    label="="
                    style={[styles.greenButton, styles.marginLeft]}
                  />
                </View>
              </>
            </Pressable>
          </TouchableOpacity>
        </View>

        {/* Monthly Graph of Emissions */}
        <View style={styles.emissionsGraph}>
          <Text style={styles.sectionTitle}>Your net-zero journey</Text>
          <View style={styles.graphContainer}>
            <LineChartBreakdown />
          </View>
          <TouchableOpacity
            style={styles.offsetButton}
            onPress={() => {
              router.push("/offset-now");
            }}
          >
            <Text style={styles.offsetButtonText}>Offset Now!</Text>
          </TouchableOpacity>
        </View>

        {/* Community */}
        <View style={styles.communitySection}>
          <Text style={styles.sectionTitle}>Forevergreen Community</Text>
          <View style={styles.communityStatsContainer}>
            <View style={styles.communityStatBox}>
              <Text style={styles.statLargeText}>10,000</Text>
              <Text style={styles.statMediumText}>Trees Planted</Text>
            </View>
            <View style={styles.communityStatBox}>
              <Text style={styles.statLargeText}>10,000</Text>
              <Text style={styles.statMediumText}>Tons CO2 Gone</Text>
            </View>
          </View>
        </View>

        {/* Forevergreen Community Leaders/Referral */}
        <View style={styles.leadersSection}>
          <Text style={styles.sectionTitle}>Community Leaders</Text>
          <View style={styles.leadersContainer}>
            <View>
              <Text style={styles.leaderText}>
                <Text style={styles.boldText}>1.</Text> jpear - 10 Referrals
              </Text>
              <Text style={styles.leaderText}>
                <Text style={styles.boldText}>2.</Text> joegjoe - 9 Referrals
              </Text>
              <Text style={styles.leaderText}>
                <Text style={styles.boldText}>3.</Text> zyardley - 8 Referrals
              </Text>
            </View>
            <Pressable
              style={styles.referButton}
              onPress={() => router.push("/referral")}
            >
              <Text style={styles.referButtonText}>Refer a friend!</Text>
            </Pressable>
          </View>
        </View>

        {/* Charts */}
        <View style={styles.chartsSection}>
          {/* Your Breakdown Pie Chart */}
          <View style={styles.chartBox}>
            <Text style={styles.chartTitle}>Your Breakdown</Text>
            <View style={styles.pieChartContainer}>
              <PieChartBreakdown
                names={["Transportation", "Diet", "Energy"]}
                values={[
                  transportationEmissions,
                  dietEmissions,
                  energyEmissions,
                ]}
                colors={["#44945F", "#AEDCA7", "#66A570"]}
                width={Math.round(width / 3)}
                height={100}
              />
              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendColor, { backgroundColor: "#44945F" }]}
                  />
                  <Text>Transportation</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendColor, { backgroundColor: "#AEDCA7" }]}
                  />
                  <Text>Diet</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendColor, { backgroundColor: "#66A570" }]}
                  />
                  <Text>Energy</Text>
                </View>
              </View>
            </View>
          </View>

          {/* You vs the Average American */}
          <View style={styles.chartBox}>
            <Text style={styles.chartTitle}>You vs the Average American</Text>
            <Text style={styles.chartSubtitle}>
              See how you rank vs the average American
            </Text>
            <BarChartBreakdown
              names={["You", "Average American"]}
              values={[emissionsPerYear, 21]}
              colors={["#44945F", "#A9A9A9"]}
            />
          </View>

          {/* If everyone lived like you */}
          <View style={styles.chartBox}>
            <Text style={styles.chartText}>
              If everyone lived like you we'd need{" "}
              {(emissionsPerYear / 6.4).toFixed(2)} Earths
            </Text>
            <EarthBreakdown emissions={emissionsPerYear} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 24,
  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  headerGreen: {
    color: "#409858",
  },
  fastFact: {
    backgroundColor: "#eeeeee",
    marginBottom: 24,
    padding: 24,
    borderRadius: 16,
  },
  fastFactTitle: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 16,
  },
  fastFactText: {
    fontSize: 18,
    textAlign: "center",
  },
  footprintContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  footprintBox: {
    backgroundColor: "#f0caca",
    borderRadius: 16,
    width: "47%",
    height: 288,
    justifyContent: "center",
    padding: 16,
  },
  calculatorBox: {
    backgroundColor: "#eeeeee",
    borderRadius: 16,
    width: "47%",
    height: 288,
    padding: 16,
  },
  boxTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  boxLargeText: {
    fontSize: 56,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  boxMediumText: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  textButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  textButtonLabel: {
    color: "white",
    fontSize: 16,
  },
  calculator: {
    flex: 1,
    backgroundColor: "#eeeeee",
    borderRadius: 8,
    justifyContent: "center",
  },
  calculatorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  grayButton: {
    backgroundColor: "#a5a5a5",
    width: "22%",
  },
  darkButton: {
    backgroundColor: "#333333",
    width: "22%",
  },
  greenButton: {
    backgroundColor: "#409858",
    width: "22%",
  },
  wideButton: {
    width: "48%",
  },
  marginLeft: {
    marginLeft: "4%",
  },
  emissionsGraph: {
    backgroundColor: "#eeeeee",
    marginBottom: 24,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
  },
  graphContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  offsetButton: {
    marginTop: 10,
    backgroundColor: "#409858",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 150,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  offsetButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  communitySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  communityStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  communityStatBox: {
    backgroundColor: "#eeeeee",
    borderRadius: 16,
    width: "47%",
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  statLargeText: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  statMediumText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  leadersSection: {
    marginBottom: 24,
  },
  leadersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#eeeeee",
    padding: 24,
    alignItems: "center",
    borderRadius: 16,
  },
  leaderText: {
    fontSize: 18,
    marginBottom: 8,
  },
  boldText: {
    fontWeight: "bold",
  },
  referButton: {
    backgroundColor: "#409858",
    marginLeft: 5,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 150,
  },
  referButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  chartsSection: {
    backgroundColor: "#eeeeee",
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
  },
  chartBox: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 24,
    marginBottom: 16,
  },
  chartSubtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  chartText: {
    fontSize: 18,
    marginBottom: 16,
  },
  pieChartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  legendContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 16,
    gap: 8,
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
});
