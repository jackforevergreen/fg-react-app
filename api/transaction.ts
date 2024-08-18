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
import { CarbonCredit, Transaction, TransactionItem } from "@/types";

// Get the most recent transactions for the current user
const getRecentTransactions = async (
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
  return Promise.all(
    querySnapshot.docs.map(async (queryDoc) => {
      const data = queryDoc.data();
      const items = await Promise.all(
        data.credits.map(async (credit: { id: string; quantity: number }) => {
          const creditRef = doc(db, "carbonCredits", credit.id);
          const creditDoc = await getDoc(creditRef);
          const creditData = creditDoc.exists()
            ? (creditDoc.data() as CarbonCredit)
            : null;
          return {
            id: credit.id,
            quantity: credit.quantity,
            price: creditData?.price || 0,
            name: creditData?.name || "Unknown Credit",
          } as TransactionItem;
        })
      );
      return {
        id: queryDoc.id,
        items,
        totalAmount: data.totalAmount,
        purchaseDate: data.purchaseDate.toDate().toISOString(),
      } as Transaction;
    })
  );
};

// Get a specific transaction by ID
const getTransactionById = async (
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

  const data = transactionDoc.data();
  const items = await Promise.all(
    data.credits.map(async (credit: { id: string; quantity: number }) => {
      const creditRef = doc(db, "carbonCredits", credit.id);
      const creditDoc = await getDoc(creditRef);
      const creditData = creditDoc.exists()
        ? (creditDoc.data() as CarbonCredit)
        : null;
      return {
        id: credit.id,
        quantity: credit.quantity,
        price: creditData?.price || 0,
        name: creditData?.name || "Unknown Credit",
      } as TransactionItem;
    })
  );

  return {
    id: transactionDoc.id,
    items,
    totalAmount: data.totalAmount,
    purchaseDate: data.purchaseDate.toDate().toISOString(),
  } as Transaction;
};

export { getRecentTransactions, getTransactionById };
