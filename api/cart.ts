import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { getAuth, User } from "firebase/auth";
import { CarbonCredit, CartItem } from "@/types";

// Helper function to get the cart reference for the current user
const getCartRef = (user: User) => {
  const db = getFirestore();

  return doc(db, "users", user.uid, "cart", "items");
};

// Add an item to the cart
export const addToCart = async (item: CarbonCredit, quantity: number = 1) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");

  const cartRef = getCartRef(user);
  const cartDoc = await getDoc(cartRef);
  const items = cartDoc.exists() ? cartDoc.data().items : [];

  const existingItemIndex = items.findIndex((i: CartItem) => i.id === item.id);

  if (existingItemIndex !== -1) {
    items[existingItemIndex].quantity += quantity;
  } else {
    items.push({ ...item, quantity });
  }

  await setDoc(cartRef, { items });
};

// Remove an item from the cart
export const removeFromCart = async (itemId: string) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");

  const cartRef = getCartRef(user);
  const cartDoc = await getDoc(cartRef);
  const items = cartDoc.exists() ? cartDoc.data().items : [];

  const updatedItems = items.filter((item: CartItem) => item.id !== itemId);
  await setDoc(cartRef, { items: updatedItems });
};

// Get the cart items
export const getCart = async (): Promise<CartItem[]> => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");

  const cartRef = getCartRef(user);
  const cartDoc = await getDoc(cartRef);
  return cartDoc.exists() ? cartDoc.data().items : [];
};

// Clear the cart
export const clearCart = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");

  const cartRef = getCartRef(user);
  await setDoc(cartRef, { items: [] });
};

// Increment item quantity
export const incrementQuantity = async (itemId: string) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");

  const cartRef = getCartRef(user);
  const cartDoc = await getDoc(cartRef);
  const items = cartDoc.exists() ? cartDoc.data().items : [];

  const updatedItems = items.map((item: CartItem) =>
    item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
  );

  await setDoc(cartRef, { items: updatedItems });
};

// Decrement item quantity
export const decrementQuantity = async (itemId: string) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");

  const cartRef = getCartRef(user);
  const cartDoc = await getDoc(cartRef);
  const items = cartDoc.exists() ? cartDoc.data().items : [];

  const item = items.find((i: CartItem) => i.id === itemId);
  if (item && item.quantity === 1) {
    await removeFromCart(itemId);
  } else {
    const updatedItems = items.map((item: CartItem) =>
      item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
    );
    await setDoc(cartRef, { items: updatedItems });
  }
};

// Calculate cart total
export const getCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Subscribe to cart changes
export const subscribeToCart = (
  callback: (items: CartItem[]) => void
): Unsubscribe => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");

  const cartRef = getCartRef(user);
  return onSnapshot(cartRef, (doc) => {
    const items = doc.exists() ? doc.data().items : [];
    callback(items);
  });
};
