import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { CarbonCredit } from "@/types";

// Fetch all carbon credits
const fetchCredits = async (): Promise<CarbonCredit[]> => {
  const db = getFirestore();
  const creditsCollection = collection(db, "carbonCredits");
  const credits: CarbonCredit[] = [];

  try {
    const querySnapshot = await getDocs(creditsCollection);
    querySnapshot.forEach((doc) => {
      const credit = doc.data() as CarbonCredit;
      credit.id = doc.id; // Ensure the id is set from the document id
      credits.push(credit);
    });

    return credits;
  } catch (error) {
    console.error("Error fetching credits from Firestore:", error);
    throw error;
  }
};

// Fetch a specific carbon credit by ID
const fetchSpecificCredit = async (
  creditId: string
): Promise<CarbonCredit | null> => {
  const db = getFirestore();
  const creditDocRef = doc(db, "carbonCredits", creditId);

  try {
    const creditDoc = await getDoc(creditDocRef);

    if (creditDoc.exists()) {
      const creditData = creditDoc.data() as CarbonCredit;
      creditData.id = creditDoc.id; // Ensure the id is set from the document id
      return creditData;
    } else {
      console.log("No such credit found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching specific credit from Firestore:", error);
    throw error;
  }
};

const fetchTrees = async () => {
  // todo: Fetch trees from API
};

export { fetchCredits, fetchSpecificCredit };
