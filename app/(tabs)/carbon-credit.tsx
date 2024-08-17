import { useState, useEffect } from "react";
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
import { fetchCredits } from "@/api/products";
import { CarbonCredit, CartItem } from "@/types";
import { subscribeToCart } from "@/api/cart";
import { PageHeader } from "@/components/common";
import { ShoppingCartBtn } from "@/components/ShoppingCartBtn";

export default function CarbonCreditScreen() {
  const [selectedProject, setSelectedProject] = useState<CarbonCredit | null>(
    null
  );
  const [credits, setCredits] = useState<CarbonCredit[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

    // Subscribe to cart changes
    const unsubscribe = subscribeToCart((items) => {
      setCartItems(items);
      setLoading(false);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  const numItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
    <>
      <PageHeader
        subtitle="Carbon Credits"
        description="Click on a project to learn more or purchase"
      />
      <ShoppingCartBtn numItems={numItems} />
    </>
  );

  const renderFooter = () => (
    <>
      <View style={styles.projectContainer}>
        {selectedProject && <ProjectCard project={selectedProject} />}
      </View>
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

  // todo: replace with loading component
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
  projectContainer: {
    padding: 16,
  },
  footer: {
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
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
    paddingHorizontal: 16,
  },
  flatList: {
    paddingHorizontal: 0,
  },
});
