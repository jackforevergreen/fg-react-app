import {
  getFirestore,
  doc,
  arrayUnion,
  runTransaction,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { CartItem } from "@/types";

export const purchaseCarbonCredits = async (
  userId: string,
  items: CartItem[]
) => {
  const db = getFirestore();
  const userRef = doc(db, "users", userId);

  try {
    // Calculate total amount
    const totalAmount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // TODO: Integrate Stripe payment here
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: Math.round(totalAmount * 100), // Stripe expects amount in cents
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

        // Create carbon credits array
        const carbonCredits = items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
        }));

        // Create a new transaction document
        const transactionRef = doc(
          collection(db, "users", userId, "transactions")
        );
        const transactionData = {
          items,
          totalAmount,
          purchaseDate: serverTimestamp(),
          carbonCredits,
          // paymentIntentId: paymentIntent.id // Uncomment when using Stripe
        };

        transaction.set(transactionRef, transactionData);

        // Update user's carbon credits
        transaction.update(userRef, {
          carbonCredits: arrayUnion(...carbonCredits),
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
