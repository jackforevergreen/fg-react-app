import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { getRecentTransactions } from "@/api/transaction";
import { fetchSpecificCredit } from "@/api/products";
import { Transaction, TransactionItem, CarbonCredit } from "@/types";
import { BackButton, Loading, PageHeader } from "@/components/common";
import { formatPrice } from "@/utils";

interface EnhancedTransactionItem extends TransactionItem {
  creditInfo?: CarbonCredit;
}

interface EnhancedTransaction extends Omit<Transaction, "items"> {
  items: EnhancedTransactionItem[];
}

const PurchaseHistoryScreen = () => {
  const [transactions, setTransactions] = useState<EnhancedTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const recentTransactions = await getRecentTransactions(10);
        const enhancedTransactions = await Promise.all(
          recentTransactions.map(async (transaction) => {
            const enhancedItems = await Promise.all(
              transaction.items.map(async (item) => {
                const creditInfo = await fetchSpecificCredit(item.id);
                return { ...item, creditInfo };
              })
            );
            return { ...transaction, items: enhancedItems };
          })
        );
        setTransactions(enhancedTransactions as EnhancedTransaction[]);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const renderTransactionItem = ({ item }: { item: EnhancedTransaction }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <Text style={styles.date}>
          {new Date(item.purchaseDate).toLocaleDateString()}
        </Text>
        <Text style={styles.amount}>{formatPrice(item.totalAmount)}</Text>
      </View>
      {item.items.map((credit, index) => (
        <View key={index} style={styles.creditItem}>
          <Text style={styles.creditName}>
            {`${credit.creditInfo?.type} Credit` || "Unknown Credit"}
          </Text>
          <Text style={styles.creditQuantity}>
            {credit.quantity} x {formatPrice(credit.price)}
          </Text>
        </View>
      ))}
      <View style={styles.paymentMethodContainer}>
        <Text style={styles.paymentMethod}>Transaction ID:</Text>
        <Text style={styles.paymentMethod}>{item.id}</Text>
      </View>
    </View>
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader subtitle="Purchase History" />
      <BackButton />
      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    padding: 16,
  },
  transactionCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  date: {
    fontSize: 16,
    color: "#6E6E77",
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
  },
  creditItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  creditName: {
    fontSize: 16,
  },
  creditQuantity: {
    fontSize: 16,
  },
  paymentMethodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  paymentMethod: {
    fontSize: 16,
    color: "#6E6E77",
  },
});

export default PurchaseHistoryScreen;
