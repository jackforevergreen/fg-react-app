import {
  getFirestore,
  doc,
  runTransaction,
  serverTimestamp,
  collection,
  getDoc,
} from "firebase/firestore";
import { CartItem, CarbonCredit } from "@/types";

// Purchase carbon credits
const purchaseCarbonCredits = async (userId: string, items: CartItem[]) => {
  const db = getFirestore();
  const userRef = doc(db, "users", userId);

  try {
    // Calculate total amount
    let totalAmount = 0;
    const creditPromises = items.map(async (item) => {
      const creditRef = doc(db, "carbonCredits", item.id);
      const creditDoc = await getDoc(creditRef);
      if (!creditDoc.exists()) {
        throw new Error(`Carbon credit with ID ${item.id} does not exist`);
      }
      const creditData = creditDoc.data() as CarbonCredit;
      totalAmount += creditData.price * item.quantity;
      return { id: item.id, quantity: item.quantity };
    });
    const purchasedCredits = await Promise.all(creditPromises);

    // TODO: Integrate Stripe payment here
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: Math.round(totalAmount), // Stripe expects amount in cents
    //   currency: 'usd',
    //   customer: userId, // Assuming you've set up the user as a Stripe customer
    //   payment_method_types: ['card'],
    // });

    // For now, we'll assume the payment was successful
    const paymentSuccessful = true; // This will be determined by Stripe in the future

    if (paymentSuccessful) {
      // Use a transaction to ensure data consistency
      const result = await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists()) {
          throw new Error("User document does not exist!");
        }

        // Create a new transaction document
        const transactionRef = doc(
          collection(db, "users", userId, "transactions")
        );
        const transactionData = {
          credits: purchasedCredits,
          totalAmount,
          purchaseDate: serverTimestamp(),
          // paymentIntentId: paymentIntent.id // Uncomment when using Stripe
        };

        transaction.set(transactionRef, transactionData);

        // Update user's carbon credits
        const existingCredits = userDoc.data().carbonCredits || [];
        const updatedCredits = purchasedCredits.map((item) => {
          const existingCredit = existingCredits.find(
            (credit: CartItem) => credit.id === item.id
          );
          if (existingCredit) {
            // If the credit already exists, update the quantity
            return {
              id: item.id,
              quantity: existingCredit.quantity + item.quantity,
            };
          } else {
            // If it's a new credit, add it to the array
            return item;
          }
        });

        // Merge the updated credits with the existing ones
        const finalCredits = existingCredits
          .filter(
            (credit: CartItem) =>
              !updatedCredits.some((uc) => uc.id === credit.id)
          )
          .concat(updatedCredits);

        transaction.update(userRef, {
          carbonCredits: finalCredits,
        });

        return transactionRef.id; // Return the transaction ID
      });

      return {
        success: true,
        transactionId: result,
      };
    } else {
      throw new Error("Payment failed");
    }
  } catch (error) {
    console.error("Error in purchaseCarbonCredits:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

export { purchaseCarbonCredits };