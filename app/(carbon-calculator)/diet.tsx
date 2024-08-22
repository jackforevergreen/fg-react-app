import { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, RadioButtonGroup, NextButton } from "@/components/carbon-calculator";
import { useEmissions } from "@/contexts";
import { calculateEmissions } from "@/api/emissions"; // Adjust the import path as needed

export default function DietCalculator() {
  const { transportationData, dietData, updateDietData, updateTotalData } = useEmissions();

  const [diet, setDiet] = useState(dietData.diet || "Average");
  const [dietEmissions, setDietEmissions] = useState(dietData.dietEmissions || 0.0);
  const transportationEmissions = transportationData.transportationEmissions || 0;
  const [isFormValid, setIsFormValid] = useState(false);
  const [progress, setProgress] = useState(0.33);

  useEffect(() => {
    setIsFormValid(diet !== "");

    // Create a new object with the current diet and other necessary data
    const emissionsData = {
      transportationData,
      dietData: { diet, dietEmissions },
      energyData: {}, // Placeholder for now
      totalData: {
        transportationEmissions,
        dietEmissions: 0, // This will be updated
        energyEmissions: 0, // Placeholder for now
        totalEmissions: 0, // This will be updated
      },
    };

    // Calculate the emissions using the calculateEmissions function
    const updatedTotalData = calculateEmissions(emissionsData);

    // Update the state with the calculated diet emissions
    setDietEmissions(updatedTotalData.dietEmissions);

    // Update context data with the new values
    updateDietData({ diet, dietEmissions: updatedTotalData.dietEmissions });
    updateTotalData(updatedTotalData);

    // Update progress based on diet selection
    if (diet !== "") {
      setProgress(0.66);
    } else {
      setProgress(0.33);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diet]);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <SafeAreaView>
        <View style={styles.contentContainer}>
          {/* Header */}
          <Header progress={progress} title="Diet" />

          {/* Diet Selection */}
          <RadioButtonGroup
            question="Select your Diet"
            options={["Meat Lover", "Average", "No Beef Or Lamb", "Veterinarian", "Vegan"]}
            value={diet}
            onChange={(selectedDiet: string) => {
              setDiet(selectedDiet);
              // You might want to calculate and set dietEmissions here
            }}
          />

          {/* Emissions Display */}
          <View style={styles.emissionsContainer}>
            <Text style={styles.emissionsTitle}>Your Estimated Individual Diet Emissions</Text>
            <View style={styles.emissionRow}>
              <Text style={styles.emissionLabel}>Transportation Emissions</Text>
              <Text style={styles.emissionValue}>{transportationEmissions.toFixed(2)}</Text>
            </View>
            <View style={styles.emissionRow}>
              <Text style={styles.emissionLabel}>Diet Emissions</Text>
              <Text style={styles.emissionValue}>{dietEmissions.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{(transportationEmissions + dietEmissions).toFixed(2)}</Text>
              <Text style={styles.totalUnit}>tons of CO2 per year</Text>
            </View>
          </View>
        </View>

        {/* Next Button */}
        <NextButton isFormValid={isFormValid} onNext="energy" />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingHorizontal: 48,
  },
  emissionsContainer: {
    marginTop: 32,
    marginBottom: 64,
  },
  emissionsTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  emissionRow: {
    flexDirection: "row",
    marginTop: 16,
  },
  emissionLabel: {
    fontSize: 18,
    marginRight: 16,
  },
  emissionValue: {
    fontSize: 18,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 18,
  },
  totalUnit: {
    fontSize: 18,
  },
});
