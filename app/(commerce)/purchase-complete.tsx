import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { BackButton } from "@/components/common";
import { LinearGradient } from "expo-linear-gradient";
import { PageHeader } from "@/components/common";
import { useLocalSearchParams } from "expo-router";
import { getTransactionById } from "@/api/transaction";
import { fetchSpecificCredit } from "@/api/products";
import { CarbonCredit, Transaction } from "@/types";
import { Image } from "expo-image";
import { Pamona } from "@/constants/Images";
import { Link } from "expo-router";
import { Loading } from "@/components/common";

interface TransactionWithCredits extends Transaction {
  items: (CarbonCredit & { quantity: number })[];
}

const PurchaseCompleteScreen = () => {
  const { transactionId } = useLocalSearchParams<{ transactionId: string }>();
  const [transaction, setTransaction] = useState<TransactionWithCredits | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactionAndCredits = async () => {
      if (!transactionId) {
        console.error("No transactionId provided");
        setLoading(false);
        return;
      }

      try {
        const fetchedTransaction = await getTransactionById(transactionId);
        if (fetchedTransaction) {
          const itemsWithCredits = await Promise.all(
            fetchedTransaction.items.map(async (item) => {
              const credit = await fetchSpecificCredit(item.id);
              return { ...credit, quantity: item.quantity } as CarbonCredit & {
                quantity: number;
              };
            })
          );
          setTransaction({ ...fetchedTransaction, items: itemsWithCredits });
        } else {
          console.error("Transaction not found for ID:", transactionId);
        }
      } catch (error) {
        console.error("Error fetching transaction or credits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionAndCredits();
  }, [transactionId]);

  if (loading) {
    return <Loading />;
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
    (total, item) => total + item.quantity,
    0
  );

  return (
    <ScrollView style={styles.container}>
      <PageHeader title="Thank you for your " titleAlt="purchase!" />
      <BackButton />
      <View style={{ padding: 16 }}>
        <LinearGradient
          style={styles.card}
          colors={["#EFEFEF", "#E5F5F6"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 32 }}>
            {transaction.items.map((credit, index) => (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  justifyContent: "center",
                }}
              >
                <LinearGradient
                  colors={credit.colors}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.gradient}
                >
                  <Image
                    source={credit.image}
                    style={{ height: 104, width: 98 }}
                  />
                </LinearGradient>

                <Text style={styles.itemDescription}>
                  {`${credit.quantity} ${credit.type} Credits`}
                </Text>
              </View>
            ))}
          </View>
          <Text style={styles.offsetText}>
            <Text>{totalCO2Offset} tons of CO</Text>
            <Text style={{ fontSize: 18 }}>2</Text>
            <Text> Offset</Text>
          </Text>
        </LinearGradient>

        <LinearGradient
          style={styles.infoContainer}
          colors={["#EFEFEF", "#E5F5F6"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          <Text style={styles.infoTitle}>
            You will be receiving an email with more
            <Text style={{ color: "#409858" }}> information shortly!</Text>
          </Text>
          <Image source={Pamona} style={styles.infoImage} />
          <View style={styles.buttonContainer}>
            <Link href="/home" style={styles.linkStyle}>
              <LinearGradient
                style={styles.button}
                colors={["#409858", "#B1E8C0"]}
                start={{ x: 0.4, y: 0 }}
                end={{ x: 0.9, y: 1 }}
              >
                <Text style={styles.buttonText}>Back Home</Text>
              </LinearGradient>
            </Link>
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

export default PurchaseCompleteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  gradient: {
    width: 148,
    height: 148,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 6,
  },
  itemDescription: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
  offsetText: {
    marginTop: 40,
    fontSize: 36,
    fontWeight: "bold",
    color: "#000",
  },
  infoContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    marginVertical: 50,
    borderRadius: 20,
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  infoImage: {
    width: "100%",
    height: 216,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  linkStyle: {
    width: "80%",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
