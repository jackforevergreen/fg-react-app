import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import dayjs from "dayjs";

interface EmissionsData {
  energyData?: any;
  transportationData?: any;
  dietData?: any;
  totalData: {
    transportationEmissions: number;
    dietEmissions: number;
    energyEmissions: number;
    totalEmissions: number;
  };
}

export const saveEmissionsData = async (data: EmissionsData) => {
  const auth = getAuth();
  const db = getFirestore();

  if (!auth.currentUser) {
    console.error("No user logged in");
    throw new Error("No user logged in");
  }

  const userId = auth.currentUser.uid;
  const formattedMonth = dayjs().format("YYYY-MM");
  const userDocRef = doc(
    collection(db, "users", userId, "surveys"),
    formattedMonth
  );

  try {
    await setDoc(
      userDocRef,
      {
        ...data,
        lastUpdated: serverTimestamp(),
      },
      { merge: true }
    );
    console.log("Emissions data saved successfully");
  } catch (error) {
    console.error("Error saving emissions data:", error);
    throw error;
  }
};

export const fetchEmissionsData = async (month?: string, userId?: string) => {
  const auth = getAuth();
  const db = getFirestore();

  if (!auth.currentUser) {
    console.error("No user logged in");
    return null;
  }

  if (!userId) {
    userId = auth.currentUser.uid;
  }

  let formattedMonth = month || dayjs().format("YYYY-MM");

  const DocRef = doc(
    collection(db, "users", userId, "surveys"),
    formattedMonth
  );

  try {
    const Doc = await getDoc(DocRef);
    return Doc.exists() ? Doc.data() : null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const calculateEmissions = (data: EmissionsData) => {
  const {
    energyData,
    transportationData,
    dietData,
    totalData,
  } = data;

  
};
