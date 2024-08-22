import { useState, useEffect } from "react";
import { View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Header,
  RadioButtonGroup,
  NumberInput,
  TransportQuestion,
  NextButton,
} from "@/components/carbon-calculator";
import QuestionSliderColor from '@/components/carbon-calculator/QuestionSliderColor';
import { useEmissions } from "@/contexts";
import { calculateEmissions } from "@/api/emissions"; // Adjust import path as necessary

export default function TransportationCalculator() {
  // Context for data
  const { transportationData, updateTransportationData, updateTotalData } = useEmissions();

  // Transportation emissions calculation
  const [longFlights, setLongFlights] = useState(transportationData.longFlights || 0);
  const [shortFlights, setShortFlights] = useState(transportationData.shortFlights || 0);
  const [carType, setCarType] = useState(transportationData.carType || "Gas");
  const [milesPerWeek, setMilesPerWeek] = useState(transportationData.milesPerWeek || "300");
  const [useTrain, setUseTrain] = useState(transportationData.useTrain || "No");
  const [trainFrequency, setTrainFrequency] = useState(transportationData.trainFrequency || "1");
  const [useBus, setUseBus] = useState(transportationData.useBus || "No");
  const [busFrequency, setBusFrequency] = useState(transportationData.busFrequency || "1");
  const [walkBike, setWalkBike] = useState(transportationData.walkBike || "No");
  const [walkBikeFrequency, setWalkBikeFrequency] = useState(transportationData.walkBikeFrequency || "1");
  const [flightEmissions, setFlightEmissions] = useState(transportationData.flightEmissions || 0.0);
  const [carEmissions, setCarEmissions] = useState(transportationData.carEmissions || 0.0);
  const [publicTransportEmissions, setPublicTransportEmissions] = useState(
    transportationData.publicTransportEmissions || 0.0
  );
  const [transportationEmissions, setTransportationEmissions] = useState(
    transportationData.transportationEmissions || 0.0
  );

  useEffect(() => {
    const emissionsData = {
      transportationData: {
        longFlights,
        shortFlights,
        carType,
        milesPerWeek,
        useTrain,
        trainFrequency,
        useBus,
        busFrequency,
        walkBike,
        walkBikeFrequency,
        flightEmissions,
        carEmissions,
        publicTransportEmissions,
        transportationEmissions,
      },
      dietData: {},
      energyData: {},
      totalData: {
        transportationEmissions: 0, // Will be updated by calculateEmissions
        dietEmissions: 0,
        energyEmissions: 0,
        totalEmissions: 0,
      },
    };

    const updatedTotalData = calculateEmissions(emissionsData);

    // Update the flight emissions specifically after the calculation
    setFlightEmissions(emissionsData.transportationData.flightEmissions || 0);
    setCarEmissions(emissionsData.transportationData.carEmissions || 0);
    setPublicTransportEmissions(emissionsData.transportationData.publicTransportEmissions || 0);
    setTransportationEmissions(updatedTotalData.transportationEmissions);

    updateTransportationData(emissionsData.transportationData);
    updateTotalData(updatedTotalData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    longFlights,
    shortFlights,
    carType,
    milesPerWeek,
    useTrain,
    trainFrequency,
    useBus,
    busFrequency,
    walkBike,
    walkBikeFrequency,
  ]);

  // Progress tracking
  const [progress, setProgress] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState({
    longFlights: false,
    shortFlights: false,
    carType: false,
    milesPerWeek: false,
    useTrain: false,
    useBus: false,
    walkBike: false,
  });

  const markQuestionCompleted = (question: string) => {
    setCompletedQuestions((prev) => ({ ...prev, [question]: true }));
  };

  useEffect(() => {
    const totalQuestions = Object.keys(completedQuestions).length;
    const completedCount = Object.values(completedQuestions).filter(Boolean).length;
    setProgress((completedCount / totalQuestions) * 0.33);
  }, [completedQuestions]);

  // Form validation
  const [milesError, setMilesError] = useState("");
  const [trainFrequencyError, setTrainFrequencyError] = useState("");
  const [busFrequencyError, setBusFrequencyError] = useState("");
  const [walkBikeFrequencyError, setWalkBikeFrequencyError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      const isValid =
        parseFloat(milesPerWeek) <= 3500 &&
        parseFloat(trainFrequency) <= 30 &&
        parseFloat(busFrequency) <= 30 &&
        parseFloat(walkBikeFrequency) <= 30;
      setIsFormValid(isValid);
    };

    validateForm();
  }, [busFrequency, milesPerWeek, trainFrequency, walkBikeFrequency]);

  const validateNumber = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    errorSetter: React.Dispatch<React.SetStateAction<string>>,
    type: "miles" | "trainFrequency" | "busFrequency" | "walkBikeFrequency"
  ) => {
    if (value === "") {
      setter("");
      errorSetter("");
    } else if (isNaN(Number(value)) || parseFloat(value) < 0) {
      errorSetter("Please enter a valid amount");
    } else if (type === "miles" ? parseFloat(value) > 3500 : parseFloat(value) > 30) {
      errorSetter(type === "miles" ? "Please enter a value less than 3500" : "Please enter a value less than 30");
    } else {
      const decimalPlaces = value.split(".")[1];
      if (decimalPlaces && decimalPlaces.length > 2) {
        setter(value.slice(0, -1));
      } else {
        setter(value);
        errorSetter("");
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <SafeAreaView>
          <View style={styles.contentContainer}>
            <Header progress={progress} title="Transportation" />
            <Text>
              First you will calculate your transportation emissions! These are all the related emissions for how you choose to get around.
            </Text>

            <QuestionSliderColor
              question="In the last year, how many long round-trip flights have you been on? (more than 10 hours round trip) ✈️"
              value={longFlights}
              onChange={(value: number) => {
                setLongFlights(value);
                updateTransportationData({ longFlights: value });
                markQuestionCompleted("longFlights");
              }}
              minimumValue={0}
              maximumValue={7}
            />
            
            <QuestionSliderColor
              question="In the last year, how many short round-trip flights have you been on? (less than 10 hours round trip) ✈️"
              value={shortFlights}
              onChange={(value: number) => {
                setShortFlights(value);
                updateTransportationData({ shortFlights: value });
                markQuestionCompleted("shortFlights");
              }}
              minimumValue={0}
              maximumValue={7}
            />

            <RadioButtonGroup
              question="What type of car do you drive? 🚗"
              options={["Gas - ⛽️", "Hybrid - ⛽️&⚡", "Electric - ⚡"]}
              value={carType}
              onChange={(value: string) => {
                setCarType(value);
                updateTransportationData({ carType: value });
                markQuestionCompleted("carType");
              }}
            />

            <NumberInput
              question="How many miles do you drive per week? 🛞"
              value={milesPerWeek}
              onChange={(value: string) => {
                validateNumber(value, setMilesPerWeek, setMilesError, "miles");
                if (value !== "") {
                  updateTransportationData({ milesPerWeek: value });
                  markQuestionCompleted("milesPerWeek");
                }
              }}
              label="Miles per week"
              error={milesError}
            />

            <TransportQuestion
              question="Do you use the train/metro? 🚉"
              useTransport={useTrain}
              setUseTransport={setUseTrain}
              frequency={trainFrequency}
              setFrequency={setTrainFrequency}
              frequencyError={trainFrequencyError}
              validateNumber={(value: string) => {
                validateNumber(value, setTrainFrequency, setTrainFrequencyError, "trainFrequency");
                if (value !== "") {
                  updateTransportationData({ trainFrequency: value });
                  markQuestionCompleted("trainFrequency");
                }
              }}
              label="time(s)"
            />
            <TransportQuestion
              question="Do you use the bus? 🚌"
              useTransport={useBus}
              setUseTransport={setUseBus}
              frequency={busFrequency}
              setFrequency={setBusFrequency}
              frequencyError={busFrequencyError}
              validateNumber={(value: string) => {
                validateNumber(value, setBusFrequency, setBusFrequencyError, "busFrequency");
                if (value !== "") {
                  updateTransportationData({ busFrequency: value });
                  markQuestionCompleted("busFrequency");
                }
              }}
              label="time(s)"
            />
            <TransportQuestion
              question="Do you walk/bike as a method of transportation? 🚲"
              useTransport={walkBike}
              setUseTransport={setWalkBike}
              frequency={walkBikeFrequency}
              setFrequency={setWalkBikeFrequency}
              frequencyError={walkBikeFrequencyError}
              validateNumber={(value: string) => {
                validateNumber(value, setWalkBikeFrequency, setWalkBikeFrequencyError, "walkBikeFrequency");
                if (value !== "") {
                  updateTransportationData({ walkBikeFrequency: value });
                  markQuestionCompleted("walkBikeFrequency");
                }
              }}
              label="time(s)"
            />
            <View style={styles.emissionsContainer}>
            <Text style={styles.emissionsTitle}>Your Individual Transportation Emissions</Text>
            <View style={styles.emissionsContent}>
              <View style={styles.emissionRow}>
                <Text>Flight Emissions:</Text>
                <Text>{flightEmissions.toFixed(2)}</Text>
              </View>
              <View style={styles.emissionRow}>
                <Text>Car Emissions:</Text>
                <Text>{carEmissions.toFixed(2)}</Text>
              </View>
              <View style={styles.emissionRow}>
                <Text>Public Transport:</Text>
                <Text>{publicTransportEmissions.toFixed(2)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text>{transportationEmissions.toFixed(2)}</Text>
                <Text>tons of CO2 per year</Text>
              </View>
            </View>
          </View>
        </View>
          <NextButton isFormValid={isFormValid} onNext="diet" />
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    paddingHorizontal: 48, // equivalent to px-12
  },
  totalSection: {
    marginTop: 32,
    marginBottom: 64,
    rowGap: 24,
  },
  totalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 18,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 32,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  emissionsContainer: {
    marginTop: 32,
    marginBottom: 64,
  },
  emissionsTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  emissionsContent: {
    marginTop: 16,
    rowGap: 16,
  },
  emissionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontWeight: "bold",
  },
});
