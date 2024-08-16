import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { CarbonCredit } from "@/types";

// Get the cart reference for the current user
const getCartRef = () => {
  const auth = getAuth();
  const db = getFirestore();
  const userId = auth.currentUser?.uid;
  if (userId) {
    return doc(db, "users", userId, "carts");
  }
  throw new Error("User is not authenticated");
};

// Add an item to the cart
// todo: make this work with tree planting
export const addToCart = async (item: CarbonCredit, quantity: number = 1) => {
  const cartRef = getCartRef();
  const cartDoc = await getDoc(cartRef);
  const items = cartDoc.data()?.items || [];

  const existingItemIndex = items.findIndex(
    (i: CarbonCredit) => i.id === item.id
  );

  if (existingItemIndex !== -1) {
    // Item already exists, update quantity
    items[existingItemIndex].quantity += quantity;
  } else {
    // New item, add to cart
    items.push({ ...item, quantity });
  }

  await setDoc(cartRef, { items }, { merge: true });
};

// Remove an item from the cart
// todo: make this work with tree planting
export const removeFromCart = async (itemId: CarbonCredit["id"]) => {
  const cartRef = getCartRef();
  const cartDoc = await getDoc(cartRef);
  const items = cartDoc.data()?.items || [];
  const itemToRemove = items.find((item: { id: string }) => item.id === itemId);
  if (itemToRemove) {
    await updateDoc(cartRef, {
      items: arrayRemove(itemToRemove),
    });
  }
};

// Get the cart items
export const getCart = async () => {
  const cartRef = getCartRef();
  const cartDoc = await getDoc(cartRef);
  return cartDoc.data()?.items || [];
};

// Clear the cart
export const clearCart = async () => {
  const cartRef = getCartRef();
  await updateDoc(cartRef, { items: [] });
};
