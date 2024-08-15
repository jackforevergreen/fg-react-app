import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { BackButton } from "@/components/common";
import { LinearGradient } from "expo-linear-gradient";
import { FGCoin } from "@/constants/Images";
import { router } from "expo-router";
import { PageHeader } from "@/components/common";
import { useLocalSearchParams } from "expo-router";

const coinsPurchased = 100;

const ConfirmationScreen = () => {
  const { numCoins } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <PageHeader title="Thank you for your " titleAlt="purchase!" />
      <BackButton />
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
          <Image source={FGCoin} style={styles.coinImage} />
        </LinearGradient>
        <Text style={styles.coinText}>{numCoins} Forevergreen Coins</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.navigate("shopping-cart")}
        >
          <Text style={styles.buttonText}>Back to Shopping Cart</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
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
  },
  coinImage: {
    width: 81,
    height: 87,
  },
  coinText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 20,
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
    fontSize: 24,
    fontWeight: "semibold",
    textAlign: "center",
  },
});

export default ConfirmationScreen;
