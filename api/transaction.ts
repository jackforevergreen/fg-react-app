import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export interface Transaction {
  id: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  purchaseDate: string;
  carbonCredits: {
    id: string;
    name: string;
    quantity: number;
  }[];
}

export const getRecentTransactions = async (
  count: number = 5
): Promise<Transaction[]> => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const db = getFirestore();
  const transactionsRef = collection(db, "users", userId, "transactions");
  const q = query(
    transactionsRef,
    orderBy("purchaseDate", "desc"),
    limit(count)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Transaction)
  );
};

export const getTransactionById = async (
  transactionId: string
): Promise<Transaction | null> => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const db = getFirestore();
  const transactionRef = doc(
    db,
    "users",
    userId,
    "transactions",
    transactionId
  );
  const transactionDoc = await getDoc(transactionRef);

  if (!transactionDoc.exists()) {
    return null;
  }

  return {
    id: transactionDoc.id,
    ...transactionDoc.data(),
  } as Transaction;
};
