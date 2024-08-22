import { getFirestore, doc, getDoc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import dayjs from "dayjs";
import { stateData } from "@/types";
import { EmissionsData } from "@/types";

// Fetch emissions data for a specific month
const saveEmissionsData = async (data: EmissionsData) => {
  const auth = getAuth();
  const db = getFirestore();

  if (!auth.currentUser) {
    console.error("No user logged in");
    throw new Error("No user logged in");
  }

  const userId = auth.currentUser.uid;
  const formattedMonth = dayjs().format("YYYY-MM");
  const userDocRef = doc(collection(db, "users", userId, "surveys"), formattedMonth);

  try {
    await setDoc(
      userDocRef,
      {
        ...data,
        lastUpdated: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error saving emissions data:", error);
    throw error;
  }
};

// Fetch emissions data for a specific month
const fetchEmissionsData = async (month?: string, userId?: string) => {
  const auth = getAuth();
  const db = getFirestore();

  if (!auth.currentUser && !userId) {
    console.error("No user logged in and no userId provided");
    return null;
  }

  userId = userId || auth.currentUser!.uid;

  let formattedMonth = month || dayjs().format("YYYY-MM");

  const DocRef = doc(collection(db, "users", userId, "surveys"), formattedMonth);

  try {
    const Doc = await getDoc(DocRef);
    return Doc.exists() ? (Doc.data() as EmissionsData) : null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const calculateEmissions = (data: EmissionsData) => {
  const { energyData, transportationData, dietData, totalData } = data;
  // Transportation Caclculation
  let transportationEmissions = 0.0;
  if (transportationData) {
    const { longFlights, shortFlights, carType, milesPerWeek, trainFrequency, busFrequency } = transportationData;

    const flightEmissions = (longFlights || 0) * 1.35 + (shortFlights || 0) * 0.9;

    const carEmissionRates: { [key: string]: number } = {
      Gas: 300,
      Hybrid: 250,
      Electric: 200,
    };

    const carEmissions =
      carType && milesPerWeek && carType in carEmissionRates
        ? (carEmissionRates[carType] * parseFloat(milesPerWeek) * 52) / 1000000
        : 0;

    const publicTransportEmissions =
      parseFloat(trainFrequency || "0") * 0.002912 * 52 + parseFloat(busFrequency || "0") * 0.005824 * 52;

    transportationEmissions = flightEmissions + carEmissions + publicTransportEmissions;

    // Set the calculated emissions back into transportationData
    transportationData.flightEmissions = flightEmissions;
    transportationData.carEmissions = carEmissions;
    transportationData.publicTransportEmissions = publicTransportEmissions;
    transportationData.transportationEmissions = transportationEmissions;
  }
  totalData.transportationEmissions = transportationEmissions;

  // Diet Calculation
  let dietEmissions = 0.0;

  if (dietData?.diet) {
    switch (dietData.diet) {
      case "Meat Lover":
        dietEmissions = 3.3;
        break;
      case "Average":
        dietEmissions = 2.5;
        break;
      case "No Beef Or Lamb":
        dietEmissions = 1.9;
        break;
      case "Vegetarian":
        dietEmissions = 1.7;
        break;
      case "Vegan":
        dietEmissions = 1.5;
        break;
      default:
        dietEmissions = 0.0;
    }
  }

  totalData.dietEmissions = dietEmissions;

  // Energy Calculation
  let energyEmissions = 0.0;
  let statesData: stateData[] = require("../constants/states.json");
  if (energyData) {
    const { state, electricBill, waterBill, propaneBill, gasBill, peopleInHome } = energyData;

    if (state && electricBill && waterBill && propaneBill && gasBill && peopleInHome) {
      const stateData = statesData.find((s) => s.name === state);

      if (stateData) {
        const electricityEmissions =
          (stateData.stateEGridValue / 2000) * (parseFloat(electricBill) / stateData.averageMonthlyElectricityBill);
        const waterEmissions = (parseFloat(waterBill) / stateData.averageMonthlyWaterBill) * 0.0052;
        const propaneEmissions = (parseFloat(propaneBill) / stateData.averageMonthlyPropaneBill) * 0.24;
        const gasEmissions = (parseFloat(gasBill) / stateData.averageMonthlyGasBill) * 2.12;

        energyEmissions = (electricityEmissions + waterEmissions + propaneEmissions + gasEmissions) / peopleInHome;

        // Update energyData with calculated emissions
        energyData.electricEmissions = electricityEmissions;
        energyData.waterEmissions = waterEmissions;
        energyData.otherEnergyEmissions = propaneEmissions + gasEmissions;
        energyData.energyEmissions = energyEmissions;
      }
    }
  }

  totalData.energyEmissions = energyEmissions;
  totalData.totalEmissions = totalData.transportationEmissions + totalData.dietEmissions + totalData.energyEmissions;

  return totalData;
};

export { saveEmissionsData, fetchEmissionsData, calculateEmissions };
