import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Header,
  QuestionSlider,
  RadioButtonGroup,
  NumberInput,
  TransportQuestion,
  NextButton,
} from "@/components/carbon-calculator";
import { useEmissions } from "@/components/carbon-calculator";

export default function TransportationCalculator() {
  // Context for data
  const { transportationData, updateTransportationData, updateTotalData } =
    useEmissions();

  // Transportation emissions calculation
  const [longFlights, setLongFlights] = useState(
    transportationData.longFlights || 0
  );
  const [shortFlights, setShortFlights] = useState(
    transportationData.shortFlights || 0
  );
  const [carType, setCarType] = useState(transportationData.carType || "Gas");
  const [milesPerWeek, setMilesPerWeek] = useState(
    transportationData.milesPerWeek || "300"
  );
  const [useTrain, setUseTrain] = useState(transportationData.useTrain || "No");
  const [trainFrequency, setTrainFrequency] = useState(
    transportationData.trainFrequency || "1"
  );
  const [useBus, setUseBus] = useState(transportationData.useBus || "No");
  const [busFrequency, setBusFrequency] = useState(
    transportationData.busFrequency || "1"
  );
  const [walkBike, setWalkBike] = useState(transportationData.walkBike || "No");
  const [walkBikeFrequency, setWalkBikeFrequency] = useState(
    transportationData.walkBikeFrequency || "1"
  );
  const [flightEmissions, setFlightEmissions] = useState(
    transportationData.flightEmissions || 0.0
  );
  const [carEmissions, setCarEmissions] = useState(
    transportationData.carEmissions || 0.0
  );
  const [publicTransportEmissions, setPublicTransportEmissions] = useState(
    transportationData.publicTransportEmissions || 0.0
  );
  const [transportationEmissions, setTransportationEmissions] = useState(
    transportationData.transportationEmissions || 0.0
  );

  useEffect(() => {
    const calculateEmissions = () => {
      const flightEmissions = longFlights * 1.35 + shortFlights * 0.9;

      const carEmissionRates: { [key: string]: number } = {
        Gas: 300,
        Hybrid: 250,
        Electric: 200,
      };

      const carEmissions =
        carType && milesPerWeek && carType in carEmissionRates
          ? (carEmissionRates[carType] * parseFloat(milesPerWeek) * 52) /
            1000000
          : 0;

      const publicTransportEmissions =
        parseFloat(trainFrequency) * 0.002912 * 52 +
        parseFloat(busFrequency) * 0.005824 * 52;

      const transportationEmissions =
        flightEmissions + carEmissions + publicTransportEmissions;

      setFlightEmissions(flightEmissions);
      setCarEmissions(carEmissions);
      setPublicTransportEmissions(publicTransportEmissions);
      setTransportationEmissions(transportationEmissions);

      updateTransportationData({
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
      });

      updateTotalData({
        transportationEmissions,
      });
    };
    calculateEmissions();
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
    const updateProgress = () => {
      const totalQuestions = Object.keys(completedQuestions).length;
      const completedCount =
        Object.values(completedQuestions).filter(Boolean).length;
      setProgress((completedCount / totalQuestions) * 0.33);
    };
    updateProgress();
  }, [completedQuestions]);

  // Form validation
  const [milesError, setMilesError] = useState("");
  const [trainFrequencyError, setTrainFrequencyError] = useState("");
  const [busFrequencyError, setBusFrequencyError] = useState("");
  const [walkBikeFrequencyError, setWalkBikeFrequencyError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    const validateForm = () => {
      if (
        parseFloat(milesPerWeek) <= 3500 &&
        parseFloat(trainFrequency) <= 30 &&
        parseFloat(busFrequency) <= 30 &&
        parseFloat(walkBikeFrequency) <= 30
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
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
    } else if (
      type === "miles" ? parseFloat(value) > 3500 : parseFloat(value) > 30
    ) {
      errorSetter(
        type === "miles"
          ? "Please enter a value less than 3500"
          : "Please enter a value less than 30"
      );
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
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <SafeAreaView>
          <View style={styles.contentContainer}>
            <Header progress={progress} title="Transportation" />

            <QuestionSlider
              question="In the last year, how many long round-trip flights have you been on? (more than 10 hours round trip) ✈️"
              value={longFlights}
              onChange={(value: number) => {
                setLongFlights(value);
                updateTransportationData({ longFlights: value });
                markQuestionCompleted("longFlights");
              }}
              labels={["0", "1", "2", "3", "4", "5", "6", "7+"]}
              minimumValue={0}
              maximumValue={7}
            />

            <QuestionSlider
              question="In the last year, how many short round-trip flights have you been on? (less than 10 hours round trip) ✈️"
              value={shortFlights}
              onChange={(value: number) => {
                setShortFlights(value);
                updateTransportationData({ shortFlights: value });
                markQuestionCompleted("shortFlights");
              }}
              labels={["0", "1", "2", "3", "4", "5", "6", "7+"]}
              minimumValue={0}
              maximumValue={7}
            />

            <RadioButtonGroup
              question="What type of car do you drive? 🚗"
              options={["Gas", "Hybrid", "Electric"]}
              value={carType}
              onChange={(value: string) => {
                setCarType(value);
                updateTransportationData({ carType: value });
                markQuestionCompleted("carType");
              }}
            />

            <NumberInput
              question="How many miles do you drive per week? 🚗"
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
              question="Do you use the train/metro?"
              useTransport={useTrain}
              setUseTransport={setUseTrain}
              frequency={trainFrequency}
              setFrequency={setTrainFrequency}
              frequencyError={trainFrequencyError}
              validateNumber={(value: string) => {
                validateNumber(
                  value,
                  setTrainFrequency,
                  setTrainFrequencyError,
                  "trainFrequency"
                );
                if (value !== "") {
                  updateTransportationData({ trainFrequency: value });
                  markQuestionCompleted("trainFrequency");
                }
              }}
              label="time(s)"
            />

            <TransportQuestion
              question="Do you use the bus?"
              useTransport={useBus}
              setUseTransport={setUseBus}
              frequency={busFrequency}
              setFrequency={setBusFrequency}
              frequencyError={busFrequencyError}
              validateNumber={(value: string) => {
                validateNumber(
                  value,
                  setBusFrequency,
                  setBusFrequencyError,
                  "busFrequency"
                );
                if (value !== "") {
                  updateTransportationData({ busFrequency: value });
                  markQuestionCompleted("busFrequency");
                }
              }}
              label="time(s) per week"
            />

            <TransportQuestion
              question="Do you walk/bike as a method of transportation?"
              useTransport={walkBike}
              setUseTransport={setWalkBike}
              frequency={walkBikeFrequency}
              setFrequency={setWalkBikeFrequency}
              frequencyError={walkBikeFrequencyError}
              validateNumber={(value: string) => {
                validateNumber(
                  value,
                  setWalkBikeFrequency,
                  setWalkBikeFrequencyError,
                  "walkBikeFrequency"
                );
                if (value !== "") {
                  updateTransportationData({ walkBikeFrequency: value });
                  markQuestionCompleted("walkBikeFrequency");
                }
              }}
              label="time(s) per week"
            />

            <View style={styles.totalSection}>
              <Text style={styles.totalTitle}>
                Your Individual Transportation Emissions
              </Text>
              <Text style={styles.totalText}>
                Flight Emissions: {flightEmissions.toFixed(2)}
              </Text>
              <Text style={styles.totalText}>
                Car Emissions: {carEmissions.toFixed(2)}
              </Text>
              <Text style={styles.totalText}>
                Public Transport: {publicTransportEmissions.toFixed(2)}
              </Text>
              <View style={styles.totalRow}>
                <Text style={styles.boldText}>Total:</Text>
                <Text style={styles.totalText}>
                  {transportationEmissions.toFixed(2)}
                </Text>
                <Text style={styles.totalText}>tons of CO2 per year</Text>
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
});
