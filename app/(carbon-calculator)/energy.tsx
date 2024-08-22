import { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Menu, Searchbar } from "react-native-paper";
import statesData from "@/constants/states.json";
import { Header, NumberInput, NextButton, QuestionSlider, RadioButtonGroup } from "@/components/carbon-calculator";
import { useEmissions } from "@/contexts";
import { saveEmissionsData } from "@/api/emissions";
import { stateData } from "@/types";

export default function EnergyCalculator() {
  const { transportationData, dietData, energyData, totalData, updateEnergyData, updateTotalData } = useEmissions();

  // State selection
  const [state, setState] = useState(energyData.state || "");
  const [stateData, setStateData] = useState<stateData>({} as stateData);
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredStates = statesData.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.abbreviation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (state) {
      const selectedState = statesData.find((s) => s.name === state);
      if (selectedState) {
        setStateData(selectedState as stateData);
      }
    }
  }, [state]);

  // Answers to questions
  const [electricBill, setElectricBill] = useState(energyData.electricBill || "");
  const [waterBill, setWaterBill] = useState(energyData.waterBill || "");
  const [propaneBill, setPropaneBill] = useState(energyData.propaneBill || "");
  const [gasBill, setGasBill] = useState(energyData.gasBill || "");
  const [useWoodStove, setUseWoodStove] = useState(energyData.useWoodStove || "Yes");
  const [peopleInHome, setPeopleInHome] = useState(energyData.peopleInHome || 1);

  // Automatically fill state and bills at random,
  // Todo: Use geolocation services to determine which state to choose
  useEffect(() => {
    const randomState = statesData[Math.floor(Math.random() * statesData.length)];
    setState(randomState.name);
    setStateData(randomState as any);
    setElectricBill(randomState.averageMonthlyElectricityBill.toFixed(2));
    setWaterBill(randomState.averageMonthlyWaterBill.toFixed(2));
    setPropaneBill(randomState.averageMonthlyPropaneBill.toFixed(2));
    setGasBill(randomState.averageMonthlyGasBill.toFixed(2));
  }, []);

  // Emissions data
  const [electricEmissions, setElectricEmissions] = useState(energyData.electricEmissions || 0.0);
  const [waterEmissions, setWaterEmissions] = useState(energyData.waterEmissions || 0.0);
  const [otherEnergyEmissions, setOtherEnergyEmissions] = useState(energyData.otherEnergyEmissions || 0.0);
  const transportationEmissions = transportationData.transportationEmissions || 0.0;
  const dietEmissions = dietData.dietEmissions || 0.0;
  const [energyEmissions, setEnergyEmissions] = useState(energyData.energyEmissions || 0.0);
  const [totalEmissions, setTotalEmissions] = useState(0.0);

  // Calculate emissions
  useEffect(() => {
    if (stateData && electricBill && waterBill && propaneBill && gasBill && peopleInHome) {
      // Calculate electricity emissions
      const electricityEmissions =
        (stateData.stateEGridValue / 2000) * (parseFloat(electricBill) / stateData.averageMonthlyElectricityBill);

      // Calculate water emissions
      const waterEmissions = (parseFloat(waterBill) / stateData.averageMonthlyWaterBill) * 0.0052;

      // Calculate propane emissions
      const propaneEmissions = (parseFloat(propaneBill) / stateData.averageMonthlyPropaneBill) * 0.24;

      // Calculate natural gas emissions
      const gasEmissions = (parseFloat(gasBill) / stateData.averageMonthlyGasBill) * 2.12;

      // Calculate total energy emissions
      const totalEnergyEmissions =
        (electricityEmissions + waterEmissions + propaneEmissions + gasEmissions) / peopleInHome;

      // Update state with new emission values
      setElectricEmissions(electricityEmissions);
      setWaterEmissions(waterEmissions);
      setOtherEnergyEmissions(propaneEmissions + gasEmissions);
      setEnergyEmissions(totalEnergyEmissions);
      setTotalEmissions(totalEnergyEmissions + transportationEmissions + dietEmissions);

      updateEnergyData({
        state,
        electricBill,
        waterBill,
        propaneBill,
        gasBill,
        useWoodStove,
        peopleInHome,
        electricEmissions: electricityEmissions,
        waterEmissions: waterEmissions,
        otherEnergyEmissions: propaneEmissions + gasEmissions,
        energyEmissions: totalEnergyEmissions,
      });

      updateTotalData({
        transportationEmissions,
        dietEmissions,
        energyEmissions: totalEnergyEmissions,
        totalEmissions: totalEnergyEmissions + transportationEmissions + dietEmissions,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    stateData,
    electricBill,
    waterBill,
    propaneBill,
    gasBill,
    peopleInHome,
    transportationEmissions,
    dietEmissions,
    energyEmissions,
  ]);

  // Progress tracking
  const [progress, setProgress] = useState(0.66);
  const updateProgress = useCallback(() => {
    let completedQuestions = 0;
    const totalQuestions = 7; // Total number of questions

    if (state) completedQuestions++;
    if (electricBill) completedQuestions++;
    if (waterBill) completedQuestions++;
    if (propaneBill) completedQuestions++;
    if (gasBill) completedQuestions++;
    if (useWoodStove) completedQuestions++;
    if (peopleInHome !== 1) completedQuestions++; // Assuming 1 is the default value

    const newProgress = 0.83 + (completedQuestions / totalQuestions) * 0.17;
    setProgress(newProgress);
  }, [state, electricBill, waterBill, propaneBill, gasBill, useWoodStove, peopleInHome]);

  useEffect(() => {
    updateProgress();
  }, [updateProgress]);

  const [electricBillError, setElectricBillError] = useState("");
  const [waterBillError, setWaterBillError] = useState("");
  const [propaneBillError, setPropaneBillError] = useState("");
  const [gasBillError, setGasBillError] = useState("");
  const renderItem = useCallback(
    ({ item }: { item: (typeof statesData)[number] }) => (
      <Menu.Item
        onPress={() => {
          setState(item.name);
          setElectricBill(item.averageMonthlyElectricityBill.toFixed(2));
          setWaterBill(item.averageMonthlyWaterBill.toFixed(2));
          setPropaneBill(item.averageMonthlyPropaneBill.toFixed(2));
          setGasBill(item.averageMonthlyGasBill.toFixed(2));
          setElectricBillError("");
          setWaterBillError("");
          setPropaneBillError("");
          setGasBillError("");
          setMenuVisible(false);
        }}
        title={`${item.name} (${item.abbreviation})`}
      />
    ),
    [
      setState,
      setElectricBill,
      setWaterBill,
      setPropaneBill,
      setGasBill,
      setElectricBillError,
      setWaterBillError,
      setPropaneBillError,
      setGasBillError,
    ]
  );

  const validateNumber = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    errorSetter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (value === "") {
      setter("");
      errorSetter("");
    } else if (isNaN(Number(value)) || parseFloat(value) < 0) {
      errorSetter("Please enter a valid amount");
    } else if (parseFloat(value) > 1000) {
      // split at the decimal and remove dollar
      setter("999.99");
      errorSetter("Please enter an amount under 1000");
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

  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    const isElectricBillValid = electricBill !== "" && parseFloat(gasBill) < 1000;
    const isWaterBillValid = waterBill !== "" && parseFloat(waterBill) < 1000;
    const isPropaneBillValid = propaneBill !== "" && parseFloat(propaneBill) < 1000;
    const isGasBillValid = gasBill !== "" && parseFloat(gasBill) < 1000;
    const isFormValid = isElectricBillValid && isWaterBillValid && isPropaneBillValid && isGasBillValid;
    setIsFormValid(isFormValid);
  }, [state, electricBill, waterBill, propaneBill, gasBill, useWoodStove, peopleInHome]);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <SafeAreaView>
        <View style={styles.contentContainer}>
          <Header progress={progress} title="Energy" />
          <Text>
              The last section are your energy emissions! These are all your utilties and energy usage at home.
            </Text>

          <Text style={styles.stateSelectionText}>Which State do you live in? 🏠</Text>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <View style={styles.stateSelectionButton}>
                  <Text>{state || "Select a state"}</Text>
                </View>
              </TouchableOpacity>
            }
          >
            <Searchbar placeholder="Search states" onChangeText={setSearchQuery} value={searchQuery} />
            <FlatList
              data={filteredStates}
              renderItem={renderItem}
              keyExtractor={(item) => item.abbreviation}
              style={styles.stateList}
            />
          </Menu>

          <NumberInput
            question="How much was your electric bill last month? ⚡"
            value={electricBill}
            onChange={(value: string) => {
              validateNumber(value, setElectricBill, setElectricBillError);
              if (electricBillError !== "") {
                setElectricBill(value);
                updateEnergyData({ electricBill: value });
              }
            }}
            unit="$"
            label="per month"
            error={electricBillError}
          />

          <NumberInput
            question="How much was your water bill last month? 🚰"
            value={waterBill}
            onChange={(value: string) => {
              validateNumber(value, setWaterBill, setWaterBillError);
              if (waterBillError !== "") {
                setWaterBill(value);
                updateEnergyData({ waterBill: value });
              }
            }}
            unit="$"
            label="per month"
            error={waterBillError}
          />

          <NumberInput
            question="How much was spent on propane last month? 🛢"
            value={propaneBill}
            onChange={(value: string) => {
              validateNumber(value, setPropaneBill, setPropaneBillError);
              if (propaneBillError !== "") {
                setPropaneBill(value);
                updateEnergyData({ propaneBill: value });
              }
            }}
            unit="$"
            label="per month"
            error={propaneBillError}
          />

          <NumberInput
            question="How much was spent on natural gas last month? ⛽"
            value={gasBill}
            onChange={(value: string) => {
              validateNumber(value, setGasBill, setGasBillError);
              if (gasBillError !== "") {
                setGasBill(value);
                updateEnergyData({ gasBill: value });
              }
            }}
            unit="$"
            label="per month"
            error={gasBillError}
          />

          <RadioButtonGroup
            question="Do you use a wood stove? 🪵"
            options={["Yes", "No"]}
            value={useWoodStove}
            onChange={(value: string) => {
              setUseWoodStove(value);
              updateEnergyData({ useWoodStove: value });
            }}
          />

          <QuestionSlider
            question="How many people live in your household?"
            value={peopleInHome}
            onChange={(value: number) => {
              setPeopleInHome(value);
              updateEnergyData({ peopleInHome: value });
            }}
            minimumValue={1}
            maximumValue={7}
          />

          <View style={styles.emissionsContainer}>
            <Text style={styles.emissionsTitle}>Your Individual Energy/Utilities Emissions</Text>
            <View style={styles.emissionsContent}>
              <View style={styles.emissionRow}>
                <Text>Electric Emissions:</Text>
                <Text>{(electricEmissions / peopleInHome).toFixed(2)}</Text>
              </View>
              <View style={styles.emissionRow}>
                <Text>Water:</Text>
                <Text>{(waterEmissions / peopleInHome).toFixed(2)}</Text>
              </View>
              <View style={styles.emissionRow}>
                <Text>Other Energy:</Text>
                <Text>{(otherEnergyEmissions / peopleInHome).toFixed(2)}</Text>
              </View>
              <View style={styles.emissionRow}>
                <Text>Transportation + Diet:</Text>
                <Text>{(transportationEmissions + dietEmissions).toFixed(2)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text>{totalEmissions.toFixed(2)}</Text>
                <Text>tons CO2 per year</Text>
              </View>
            </View>
          </View>
        </View>

        <NextButton
          isFormValid={isFormValid}
          onNext="breakdown"
          saveData={() => {
            saveEmissionsData({
              transportationData,
              dietData,
              energyData,
              totalData,
            });
          }}
        />
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
  stateSelectionText: {
    marginTop: 24,
    fontSize: 18,
  },
  stateSelectionButton: {
    marginTop: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
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
  totalRow: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 40,
  },
  totalLabel: {
    fontWeight: "bold",
  },
  stateList: {
    maxHeight: 300,
  },
});
