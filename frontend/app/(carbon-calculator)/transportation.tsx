import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Header,
  QuestionSlider,
  RadioButtonGroup,
  NumberInput,
  TransportQuestion,
  NextButton,
} from "../../components/carbon-calculator";

export default function TransportationCalculator() {
  const [longFlights, setLongFlights] = useState(0);
  const [shortFlights, setShortFlights] = useState(0);
  const [carType, setCarType] = useState("Gas");
  const [milesPerWeek, setMilesPerWeek] = useState("300");
  const [milesError, setMilesError] = useState("");
  const [useTrain, setUseTrain] = useState("No");
  const [trainFrequency, setTrainFrequency] = useState("1");
  const [trainFrequencyError, setTrainFrequencyError] = useState("");
  const [useBus, setUseBus] = useState("No");
  const [busFrequency, setBusFrequency] = useState("1");
  const [busFrequencyError, setBusFrequencyError] = useState("");
  const [walkBike, setWalkBike] = useState("No");
  const [walkBikeFrequency, setWalkBikeFrequency] = useState("1");
  const [walkBikeFrequencyError, setWalkBikeFrequencyError] = useState("");
  const [flightEmissions, setFlightEmissions] = useState(0.0);
  const [carEmissions, setCarEmissions] = useState(0.0);
  const [publicTransportEmissions, setPublicTransportEmissions] = useState(0.0);
  const [transportationEmissions, setTransportationEmissions] = useState(0.0);
  const [isFormValid, setIsFormValid] = useState(false);
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

  useEffect(() => {
    const updateProgress = () => {
      const totalQuestions = Object.keys(completedQuestions).length;
      const completedCount =
        Object.values(completedQuestions).filter(Boolean).length;
      setProgress((completedCount / totalQuestions) * 0.33);
    };
    updateProgress();
  }, [completedQuestions]);

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
    };
    calculateEmissions();
  }, [
    longFlights,
    shortFlights,
    carType,
    milesPerWeek,
    trainFrequency,
    busFrequency,
  ]);

  useEffect(() => {
    const validateForm = () => {
      const isTrainValid =
        useTrain === "No" ||
        (useTrain === "Yes" && trainFrequency !== "" && !trainFrequencyError);
      const isBusValid =
        useBus === "No" ||
        (useBus === "Yes" && busFrequency !== "" && !busFrequencyError);
      const isWalkBikeValid =
        walkBike === "No" ||
        (walkBike === "Yes" &&
          walkBikeFrequency !== "" &&
          !walkBikeFrequencyError);

      if (
        milesPerWeek !== "" &&
        !milesError &&
        isTrainValid &&
        isBusValid &&
        isWalkBikeValid
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    validateForm();
  }, [
    milesPerWeek,
    milesError,
    useTrain,
    trainFrequency,
    trainFrequencyError,
    useBus,
    busFrequency,
    busFrequencyError,
    walkBike,
    walkBikeFrequency,
    walkBikeFrequencyError,
  ]);

  const markQuestionCompleted = (question: string) => {
    setCompletedQuestions((prev) => ({ ...prev, [question]: true }));
  };

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
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView>
          {/* Header */}
          <View className="px-12">
            <Header progress={progress} title="Transportation" />

            {/* Long round-trip flights */}
            <QuestionSlider
              question="In the last year, how many long round-trip flights have you been on? (more than 10 hours round trip) ✈️"
              value={longFlights}
              onChange={(value: React.SetStateAction<number>) => {
                setLongFlights(value);
                markQuestionCompleted("longFlights");
              }}
              labels={["0", "1", "2", "3", "4", "5", "6", "7+"]}
              minimumValue={0}
              maximumValue={7}
            />

            {/* Short round-trip flights */}
            <QuestionSlider
              question="In the last year, how many short round-trip flights have you been on? (less than 10 hours round trip) ✈️"
              value={shortFlights}
              onChange={(value: React.SetStateAction<number>) => {
                setShortFlights(value);
                markQuestionCompleted("shortFlights");
              }}
              labels={["0", "1", "2", "3", "4", "5", "6", "7+"]}
              minimumValue={0}
              maximumValue={7}
            />

            {/* Type of Car */}
            <RadioButtonGroup
              question="What type of car do you drive? 🚗"
              options={["Gas", "Hybrid", "Electric"]}
              value={carType}
              onChange={(value: React.SetStateAction<string>) => {
                setCarType(value);
                markQuestionCompleted("carType");
              }}
            />

            {/* Miles per week */}
            <NumberInput
              question="How many miles do you drive per week? 🚗"
              value={milesPerWeek}
              onChange={(value: string) => {
                validateNumber(value, setMilesPerWeek, setMilesError, "miles");
                if (value !== "") {
                  markQuestionCompleted("milesPerWeek");
                }
              }}
              unit=""
              label="Miles per week"
              error={milesError}
            />

            {/* Train/metro */}
            <TransportQuestion
              question="Do you use the train/metro?"
              useTransport={useTrain}
              setUseTransport={setUseTrain}
              frequency={trainFrequency}
              setFrequency={setTrainFrequency}
              frequencyError={trainFrequencyError}
              validateNumber={(value: string) =>
                validateNumber(
                  value,
                  setTrainFrequency,
                  setTrainFrequencyError,
                  "trainFrequency"
                )
              }
              label="time(s) per week"
            />

            {/* Bus */}
            <TransportQuestion
              question="Do you use the bus?"
              useTransport={useBus}
              setUseTransport={setUseBus}
              frequency={busFrequency}
              setFrequency={setBusFrequency}
              frequencyError={busFrequencyError}
              validateNumber={(value: string) =>
                validateNumber(
                  value,
                  setBusFrequency,
                  setBusFrequencyError,
                  "busFrequency"
                )
              }
              label="time(s) per week"
            />

            {/* Walk/bike */}
            <TransportQuestion
              question="Do you walk/bike as a method of transportation?"
              useTransport={walkBike}
              setUseTransport={setWalkBike}
              frequency={walkBikeFrequency}
              setFrequency={setWalkBikeFrequency}
              frequencyError={walkBikeFrequencyError}
              validateNumber={(value: string) =>
                validateNumber(
                  value,
                  setWalkBikeFrequency,
                  setWalkBikeFrequencyError,
                  "walkBikeFrequency"
                )
              }
              label="time(s) per week"
            />

            {/* Total */}
            <View className="mt-8 mb-16 flex-col gap-6">
              <Text className="text-xl font-bold">
                Your Individual Transportation Emissions
              </Text>
              <Text className="text-lg">
                Flight Emissions: {flightEmissions.toFixed(2)}
              </Text>
              <Text className="text-lg">
                Car Emissions: {carEmissions.toFixed(2)}
              </Text>
              <Text className="text-lg">
                Public Transport: {publicTransportEmissions.toFixed(2)}
              </Text>
              <View className="font-bold flex-row justify-between mr-8">
                <Text className="font-bold text-lg">Total:</Text>
                <Text className="text-lg">
                  {transportationEmissions.toFixed(2)}
                </Text>
                <Text className="text-lg">tons of CO2 per year</Text>
              </View>
            </View>
          </View>

          {/* Next Button */}
          <NextButton
            isFormValid={isFormValid}
            onNext="diet"
            data={{
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
            }}
            type="transportation"
          />
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
