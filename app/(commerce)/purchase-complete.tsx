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
import { router } from "expo-router";
import { PageHeader } from "@/components/common";
import { useLocalSearchParams } from "expo-router";
import { getTransactionById, Transaction } from "@/api/transaction";
import { formatPrice } from "@/utils/format";
import { CarbonCredit } from "@/types";

const PurchaseCompleteScreen = () => {
  const { transactionId } = useLocalSearchParams<{ transactionId: string }>();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      if (!transactionId) {
        console.error("No transactionId provided");
        setLoading(false);
        return;
      }

      try {
        const fetchedTransaction = await getTransactionById(transactionId);
        if (fetchedTransaction) {
          setTransaction(fetchedTransaction);
        } else {
          console.error("Transaction not found for ID:", transactionId);
        }
      } catch (error) {
        console.error("Error fetching transaction:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId]);

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
        <Text>Error: {"Transaction not found"}</Text>
        <Text>Transaction ID: {transactionId}</Text>
      </View>
    );
  }

  // Calculate total CO2 offset
  const totalCO2Offset = transaction.items.reduce(
    (total: number, item: any) => total + item.quantity,
    0
  );

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
            <Text style={styles.checkmark}>✓</Text>
          </LinearGradient>
          <Text style={styles.purchaseText}>Carbon Credits Purchased:</Text>
          {transaction.carbonCredits.map((credit, index: number) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.itemName}>{credit.name}</Text>
              <Text style={styles.itemQuantity}>
                Quantity: {credit.quantity}
              </Text>
            </View>
          ))}
          <Text style={styles.totalText}>
            Total Spent: {formatPrice(transaction.totalAmount)}
          </Text>
          <Text style={styles.offsetText}>
            Total CO2 Offset: {totalCO2Offset} tons
          </Text>
          <Text style={styles.transactionId}>
            Transaction ID: {transactionId}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.navigate("carbon-credit")}
          >
            <Text style={styles.buttonText}>Back to Carbon Credits</Text>
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
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 16,
  },
  checkmark: {
    fontSize: 60,
    color: "white",
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
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
  },
  offsetText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    color: "#409858",
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
