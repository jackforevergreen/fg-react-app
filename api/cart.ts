import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { getAuth, User } from "firebase/auth";
import { CartItem } from "@/types";

// Helper function to get the cart reference for the current user
const getCartRef = (user: User) => {
  const db = getFirestore();
  return doc(db, "users", user.uid, "cart", "items");
};

// Add an item to the cart
const addToCart = async (creditId: string, quantity: number = 1) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");

  const cartRef = getCartRef(user);
  const cartDoc = await getDoc(cartRef);
  let items: CartItem[] = cartDoc.exists() ? cartDoc.data().items || [] : [];

  const existingItemIndex = items.findIndex((i) => i.id === creditId);

  if (existingItemIndex !== -1) {
    items[existingItemIndex].quantity += quantity;
  } else {
    items.push({ id: creditId, quantity });
  }

  await setDoc(cartRef, { items });
};

// Remove an item from the cart
const removeFromCart = async (creditId: string) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");

  const cartRef = getCartRef(user);
  const cartDoc = await getDoc(cartRef);
  let items: CartItem[] = cartDoc.exists() ? cartDoc.data().items || [] : [];

  const updatedItems = items.filter((item) => item.id !== creditId);
  await setDoc(cartRef, { items: updatedItems });
};

// Get the cart items
const getCart = async (): Promise<CartItem[]> => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");

  const cartRef = getCartRef(user);
  const cartDoc = await getDoc(cartRef);
  return cartDoc.exists() ? cartDoc.data().items || [] : [];
};

// Clear the cart
const clearCart = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");

  const cartRef = getCartRef(user);
  await setDoc(cartRef, { items: [] });
};

// Increment item quantity
const incrementQuantity = async (creditId: string) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");

  const cartRef = getCartRef(user);
  const cartDoc = await getDoc(cartRef);
  let items: CartItem[] = cartDoc.exists() ? cartDoc.data().items || [] : [];

  const updatedItems = items.map((item) =>
    item.id === creditId ? { ...item, quantity: item.quantity + 1 } : item
  );

  await setDoc(cartRef, { items: updatedItems });
};

// Decrement item quantity
const decrementQuantity = async (creditId: string) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");

  const cartRef = getCartRef(user);
  const cartDoc = await getDoc(cartRef);
  let items: CartItem[] = cartDoc.exists() ? cartDoc.data().items || [] : [];

  const item = items.find((i) => i.id === creditId);
  if (item && item.quantity === 1) {
    await removeFromCart(creditId);
  } else {
    const updatedItems = items.map((item) =>
      item.id === creditId ? { ...item, quantity: item.quantity - 1 } : item
    );
    await setDoc(cartRef, { items: updatedItems });
  }
};

// Subscribe to cart changes
const subscribeToCart = (
  callback: (items: CartItem[]) => void
): Unsubscribe => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");

  const cartRef = getCartRef(user);
  return onSnapshot(cartRef, (doc) => {
    const items = doc.exists() ? doc.data().items || [] : [];
    callback(items);
  });
};

export {
  addToCart,
  removeFromCart,
  getCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  subscribeToCart,
};
