import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  increment,
  runTransaction,
  collection,
  serverTimestamp,
} from "firebase/firestore";

// Placeholder for fetching the available coins options
export const fetchCoinsOptions = async () => {
  const coinsOptions = [
    { coins: 100, price: 10.0 },
    { coins: 200, price: 20.0 },
    { coins: 400, price: 40.0 },
    { coins: 600, price: 60.0 },
    { coins: 800, price: 80.0 },
    { coins: 1000, price: 100.0 },
  ];
  return coinsOptions;
};

// Update the user's fg-coins balance
export const updateFgCoinsBalance = async (userId: string, amount: number) => {
  const db = getFirestore();
  const userDocRef = doc(db, "users", userId);
  await updateDoc(userDocRef, {
    fgCoins: increment(amount),
  });
};

// Purchase fg-coins
export const purchaseFgCoins = async (
  userId: string,
  amount: number,
  paymentMethod: string
) => {
  try {
    // Implement your payment processing logic here
    // This is a placeholder for the actual payment processing
    const paymentSuccessful = await processPayment(amount, paymentMethod);

    if (paymentSuccessful) {
      await updateFgCoinsBalance(userId, amount);
      return true;
    } else {
      throw new Error("Payment failed");
    }
  } catch (error) {
    console.error("Error purchasing fg-coins:", error);
    return false;
  }
};

// Purchase carbon credits using fg-coins
export const purchaseCarbonCredits = async (
  userId: string,
  fgCoinsAmount: number,
  carbonCreditsAmount: number
) => {
  const db = getFirestore();
  const userDocRef = doc(db, "users", userId);

  try {
    // Start a transaction to ensure data consistency
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userDocRef);
      const currentBalance = userDoc.data()?.fgCoins;

      if (currentBalance < fgCoinsAmount) {
        throw new Error("Insufficient fg-coins balance");
      }

      // Deduct fg-coins and add carbon credits
      transaction.update(userDocRef, {
        fgCoins: increment(-fgCoinsAmount),
        carbonCredits: increment(carbonCreditsAmount),
      });

      // Create a separate collection for carbon credit transactions
      const carbonCreditTransactionRef = doc(
        collection(db, "carbonCreditTransactions")
      );
      transaction.set(carbonCreditTransactionRef, {
        userId: userId,
        fgCoinsSpent: fgCoinsAmount,
        carbonCreditsReceived: carbonCreditsAmount,
        timestamp: serverTimestamp(),
      });
    });

    return true;
  } catch (error) {
    console.error("Error purchasing carbon credits:", error);
    return false;
  }
};

// Get the user's current fg-coins balance
export const getFgCoinsBalance = async (userId: string) => {
  const db = getFirestore();
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);
  return userDoc.data()?.fgCoins;
};

// Get the user's carbon credits balance
export const getCarbonCreditsBalance = async (userId: string) => {
  const db = getFirestore();
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);
  return userDoc.data()?.carbonCredits || 0;
};

// Get the user's transaction history
export const getTransactionHistory = async (userId: string) => {
  // Todo: Implement fetching transaction history (probably with RevenueCat)
};

// Remember to implement the actual payment processing function
export const processPayment = async (amount: number, paymentMethod: string) => {
  // Placeholder for the actual payment processing logic
  return true;
};
