import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { CarbonCredit } from "@/types";

const getCartRef = () => {
  const auth = getAuth();
  const db = getFirestore();
  const userId = auth.currentUser?.uid;
  if (userId) {
    return doc(db, "users", userId, "carts");
  }
  throw new Error("User is not authenticated");
};

export const addToCart = async (item: CarbonCredit) => {
  const cartRef = getCartRef();
  await setDoc(
    cartRef,
    {
      items: arrayUnion(item),
    },
    { merge: true }
  );
};

export const removeFromCart = async (itemId: CarbonCredit["id"]) => {
  const cartRef = getCartRef();
  const cartDoc = await getDoc(cartRef);
  const items = cartDoc.data()?.items || [];
  const itemToRemove = items.find((item: { id: string; }) => item.id === itemId);
  if (itemToRemove) {
    await updateDoc(cartRef, {
      items: arrayRemove(itemToRemove),
    });
  }
};

export const getCart = async () => {
  const cartRef = getCartRef();
  const cartDoc = await getDoc(cartRef);
  return cartDoc.data()?.items || [];
};

export const clearCart = async () => {
  const cartRef = getCartRef();
  await updateDoc(cartRef, { items: [] });
};
