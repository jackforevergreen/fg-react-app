import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import CreditItem from "@/components/carbon-credit/CreditItem";
import ProjectCard from "@/components/carbon-credit/ProjectCard";
import { fetchCredits } from "@/api/credits";
import { CarbonCredit } from "@/types";
import Icon from "react-native-vector-icons/Feather";
import { useCart } from "@/contexts";
import { router } from "expo-router";

export default function CarbonCreditScreen() {
  const [selectedProject, setSelectedProject] = useState<CarbonCredit | null>(
    null
  );
  const [credits, setCredits] = useState<CarbonCredit[]>([]);
  const [loading, setLoading] = useState(true);
  const { items } = useCart();
  const numItems = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setLoading(true);
    const initializeData = async () => {
      const result = await fetchCredits();
      if (result && result.length > 0) {
        setCredits(result as CarbonCredit[]);
        setSelectedProject(result[0] as CarbonCredit);
      }
    };
    initializeData();
    setLoading(false);
  }, []);

  const renderCreditItem = ({ item }: { item: CarbonCredit }) => (
    <CreditItem
      name={item.name}
      price={item.price}
      image={item.image}
      colors={item.colors}
      onPress={() => setSelectedProject(item)}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>
          Forever<Text style={styles.titleGreen}>green</Text>
        </Text>
        <Text style={styles.subtitle}>Carbon Credits</Text>
        <Text style={styles.description}>
          Click on a project to learn more or purchase
        </Text>
      </View>
      <TouchableOpacity
        style={styles.cartContainer}
        onPress={() => router.navigate("/shopping-cart")}
      >
        <Icon name="shopping-cart" size={24} color="white" />
        {numItems > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {numItems < 10 ? numItems : "9+"}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => (
    <>
      {selectedProject && <ProjectCard project={selectedProject} />}

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Carbon Credit Subscription</Text>
        <Text style={styles.footerText}>
          The Forevergreen carbon credit subscription includes the purchase of
          the nearest whole number of carbon credits to make sure you are net
          zero every month. This is the easiest way to reduce your impact on the
          planet and support awesome climate projects!
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>$20/Month</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={credits}
        renderItem={renderCreditItem}
        keyExtractor={(item) => item.name}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        style={styles.flatList}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 24,
  },
  headerContent: {
    alignItems: "center",
    marginTop: 32,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
  },
  titleGreen: {
    color: "#409858",
  },
  subtitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
  },
  footer: {
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  footerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  footerText: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: "center",
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#409858",
    padding: 16,
    marginHorizontal: "auto",
    borderRadius: 9999,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    fontSize: 20,
    paddingHorizontal: 8,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingVertical: 30,
  },
  flatList: {
    paddingHorizontal: 16,
  },
  cartContainer: {
    position: "absolute",
    top: 65,
    right: 0,
    padding: 10,
    backgroundColor: "#409858",
    borderRadius: 9999,
  },
  badge: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
