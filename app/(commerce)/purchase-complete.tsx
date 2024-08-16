import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { BackButton } from "@/components/common";
import { LinearGradient } from "expo-linear-gradient";
import { FgCoin } from "@/constants/Images";
import { router } from "expo-router";
import { PageHeader } from "@/components/common";
import { useLocalSearchParams } from "expo-router";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const PurchaseCompleteScreen = () => {
  const auth = getAuth();
  const { transactionId } = useLocalSearchParams<{ transactionId: string }>();
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      if (!transactionId || !auth.currentUser) {
        setLoading(false);
        return;
      }

      const db = getFirestore();
      const transactionRef = doc(
        db,
        "users",
        auth.currentUser.uid,
        "transactions",
        transactionId
      );

      try {
        const transactionDoc = await getDoc(transactionRef);
        if (transactionDoc.exists()) {
          setTransaction(transactionDoc.data());
        } else {
          console.error("Transaction not found");
        }
      } catch (error) {
        console.error("Error fetching transaction:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId, auth.currentUser]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#409858" />
      </View>
    );
  }

  if (!transaction) {
    return (
      <View style={styles.container}>
        <Text>Transaction not found</Text>
      </View>
    );
  }
  const isCarbonCreditPurchase = transaction.type === "carbon_credit_purchase";

  // Calculate total CO2 offset
  const totalCO2Offset = transaction.items.reduce((total: number, item: any) => total + item.quantity, 0);

  return (
    <View style={styles.container}>
      <PageHeader title="Thank you for your " titleAlt="purchase!" />
      <BackButton />
      <ScrollView>
        <LinearGradient
          style={styles.card}
          colors={["#EFEFEF", "#E5F5F6"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          <LinearGradient
            colors={["#34C759", "#409858", "#25532E"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.gradient}
          >
            <Image source={FgCoin} style={styles.coinImage} />
          </LinearGradient>
          {isCarbonCreditPurchase ? (
            <>
              <Text style={styles.purchaseText}>Carbon Credits Purchased:</Text>
              {transaction.items.map((item: any, index: number) => (
                <View key={index} style={styles.itemContainer}>
                  <Text style={styles.itemName}>{item.carbonCreditName}</Text>
                  <Text style={styles.itemQuantity}>
                    Quantity: {item.quantity}
                  </Text>
                  <Text style={styles.itemPrice}>
                    Price: {item.quantity * item.unitPrice} FG Coins
                  </Text>
                </View>
              ))}
              <Text style={styles.totalText}>
                Total Spent: {transaction.fgCoinsSpent} FG Coins
              </Text>
            </>
          ) : (
            <Text style={styles.coinText}>
              {transaction.amount} Forevergreen Coins
            </Text>
          )}
          <Text style={styles.transactionId}>
            Transaction ID: {transactionId}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.navigate(
                isCarbonCreditPurchase ? "carbon-credit" : "shopping-cart"
              )
            }
          >
            <Text style={styles.buttonText}>
              {isCarbonCreditPurchase
                ? "Back to Carbon Credits"
                : "Back to Shopping Cart"}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default PurchaseCompleteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  gradient: {
    width: 149,
    height: 155,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 16,
  },
  coinImage: {
    width: 81,
    height: 87,
  },
  coinText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  purchaseText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: "100%",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemQuantity: {
    fontSize: 14,
    color: "#666",
  },
  itemPrice: {
    fontSize: 14,
    color: "#666",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
  },
  transactionId: {
    fontSize: 14,
    color: "#666",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#409858",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 50,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
