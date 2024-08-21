import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Feather";
import { getAuth } from "firebase/auth";
import {
  incrementQuantity,
  decrementQuantity,
  getCart,
  clearCart,
} from "@/api/cart";
import { CartItem, CarbonCredit } from "@/types";
import { router } from "expo-router";
import { PageHeader, BackButton, Loading } from "@/components/common";
import { purchaseCarbonCredits, fetchPaymentSheetParams } from "@/api/purchase";
import { formatPrice } from "@/utils";
import { fetchSpecificCredit } from "@/api/products";
import { useStripe } from "@/utils/stripe";

interface CartItemWithDetails extends CartItem, CarbonCredit {}

export default function ShoppingCartScreen() {
  const auth = getAuth();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [items, setItems] = useState<CartItemWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Function to calculate cart total
  const getCartTotal = useCallback(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  // Fetch cart items and calculate total on page mount
  useEffect(() => {
    const fetchCartWithDetails = async () => {
      try {
        const cartItems = await getCart();
        const itemsWithDetails = await Promise.all(
          cartItems.map(async (item) => {
            const creditDetails = await fetchSpecificCredit(item.id);
            return { ...item, ...creditDetails };
          })
        );
        setItems(itemsWithDetails as CartItemWithDetails[]);
      } catch (error) {
        console.error("Error fetching cart:", error);
        Alert.alert("Error", "Failed to load your cart. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartWithDetails();
  }, []);

  // Initialize PaymentSheet
  const initializePaymentSheet = useCallback(async () => {
    if (!auth.currentUser) {
      router.replace("/login");
    }

    // Fetch payment sheet parameters
    try {
      setIsProcessingPayment(true);
      const { paymentIntent, ephemeralKey, customer } =
        await fetchPaymentSheetParams(
          getCartTotal(),
          auth.currentUser?.uid || ""
        );

      // Stripe configuration to open the payment sheet
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Forevergreen",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: auth.currentUser?.displayName || "",
          email: auth.currentUser?.email || "",
        },
        applePay: {
          merchantCountryCode: "US",
          testEnv: true,
        },
        googlePay: {
          merchantCountryCode: "US",
          testEnv: true, // use test environment
        },
        returnURL: "com.fgdevteam.fgreactapp://stripe-redirect",

      });

      if (error) {
        console.error("Error initializing payment sheet:", error);
        Alert.alert("Error", "Failed to initialize payment. Please try again.");
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
      Alert.alert("Error", "Failed to initialize payment. Please try again.");
    } finally {
      setIsProcessingPayment(false);
    }
  }, [auth.currentUser, getCartTotal, initPaymentSheet]);

  // Open payment sheet when user taps on "Buy Now"
  const openPaymentSheet = async () => {
    await initializePaymentSheet();

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      handleSuccessfulPurchase();
    }
  };

  // Successful purchase logic
  const handleSuccessfulPurchase = async () => {
    try {
      setIsProcessingPayment(true);
      const result = await purchaseCarbonCredits(
        auth.currentUser?.uid || "",
        items
      );

      if (result.success) {
        await clearCart();
        setItems([]);

        Alert.alert(
          "Purchase Successful",
          "Your carbon credits have been added to your account."
        );
        router.push({
          pathname: "/purchase-complete",
          params: { transactionId: result.transactionId },
        });
      } else {
        throw new Error("Purchase failed");
      }
    } catch (error) {
      console.error("Error during purchase:", error);
      Alert.alert(
        "Purchase Failed",
        "There was an error processing your purchase. Please try again."
      );
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Increment quantity of a cart item
  const handleIncrementQuantity = async (itemId: string) => {
    try {
      setIsUpdatingQuantity(true);
      await incrementQuantity(itemId);
      const updatedCart = await getCart();
      const updatedItemsWithDetails = await Promise.all(
        updatedCart.map(async (item) => {
          const creditDetails = await fetchSpecificCredit(item.id);
          return { ...item, ...creditDetails };
        })
      );
      setItems(updatedItemsWithDetails as CartItemWithDetails[]);
    } catch (error) {
      console.error("Error incrementing quantity:", error);
      Alert.alert("Error", "Failed to update quantity. Please try again.");
    } finally {
      setIsUpdatingQuantity(false);
    }
  };

  // Decrement quantity of a cart item
  const handleDecrementQuantity = async (itemId: string) => {
    try {
      setIsUpdatingQuantity(true);
      await decrementQuantity(itemId);
      const updatedCart = await getCart();
      const updatedItemsWithDetails = await Promise.all(
        updatedCart.map(async (item) => {
          const creditDetails = await fetchSpecificCredit(item.id);
          return { ...item, ...creditDetails };
        })
      );
      setItems(updatedItemsWithDetails as CartItemWithDetails[]);
    } catch (error) {
      console.error("Error decrementing quantity:", error);
      Alert.alert("Error", "Failed to update quantity. Please try again.");
    } finally {
      setIsUpdatingQuantity(false);
    }
  };

  // Render cart items
  const renderItem = ({ item }: { item: CartItemWithDetails }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <LinearGradient
          colors={item.colors}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradient}
        >
          <Image source={item.image} style={styles.itemImage} />
        </LinearGradient>
      </View>
      <View style={styles.itemActions}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            onPress={() => handleDecrementQuantity(item.id)}
            style={styles.quantityButton}
          >
            <Icon name="minus" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => handleIncrementQuantity(item.id)}
            style={styles.quantityButton}
          >
            <Icon name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.itemPrice}>
          {formatPrice(item.price * item.quantity)}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return <Loading />;
  }

  const ListHeaderComponent = () => (
    <>
      <PageHeader
        subtitle="Shopping Cart"
        description="Make a Positive Impact on the Environment Today!"
      />
      <BackButton />
    </>
  );

  // TODO: This needs some flair
  const ListEmptyComponent = () => (
    <View style={styles.emptyCartContainer}>
      <Text style={styles.emptyCartText}>Your cart is empty</Text>
    </View>
  );

  const ListFooterComponent = () => (
    <View style={styles.footer}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValueText}>{formatPrice(getCartTotal())}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.purchaseButton,
          (items.length === 0 || isUpdatingQuantity || isProcessingPayment) &&
            styles.disabledButton,
        ]}
        onPress={openPaymentSheet}
        disabled={
          items.length === 0 || isUpdatingQuantity || isProcessingPayment
        }
      >
        <Text style={styles.purchaseButtonText}>
          {isProcessingPayment ? "Processing..." : "Buy Now"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => router.navigate("/carbon-credit")}
      >
        <Text style={styles.continueButtonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.greenCircleLarge} />
      <View style={styles.greenCircleSmall} />
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  flatList: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  greenCircleLarge: {
    position: "absolute",
    width: 300,
    height: 300,
    backgroundColor: "#409858",
    borderRadius: 150,
    bottom: "15%",
    right: "-35%",
  },
  greenCircleSmall: {
    position: "absolute",
    width: 300,
    height: 300,
    backgroundColor: "#409858",
    borderRadius: 9999,
    top: "25%",
    left: "-25%",
  },
  creditList: {
    marginBottom: 24,
  },
  footer: {
    backgroundColor: "#eeeeee",
    padding: 24,
    borderRadius: 20,
    marginTop: "auto",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 24,
    fontWeight: "bold",
  },
  totalValue: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalValueText: {
    marginLeft: 4,
    fontSize: 24,
    fontWeight: "bold",
  },
  purchaseButton: {
    backgroundColor: "#409858",
    borderRadius: 50,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  purchaseButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  continueButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#409858",
    borderRadius: 50,
    padding: 16,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#409858",
    fontSize: 20,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    marginBottom: 24,
    backgroundColor: "#EEEEEE",
    borderRadius: 20,
  },
  itemInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  gradient: {
    width: 112,
    height: 112,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
  itemImage: {
    width: 80,
    height: 86,
  },
  itemActions: {
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
  itemName: {
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: 18,
    maxWidth: 160,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: "black",
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    fontSize: 20,
    fontWeight: "bold",
    height: 30,
    width: 20,
    marginHorizontal: 8,
    textAlign: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinImage: {
    width: 20,
    height: 20,
  },
  itemPrice: {
    marginLeft: 8,
    fontSize: 20,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 18,
    color: "#666",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});
