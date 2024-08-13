import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import { FGCoin } from "@/constants/Images";
import { PageHeader, BackButton } from "@/components/common";
import { LinearGradient } from "expo-linear-gradient";

const coinOptions = [
  { coins: 100, price: 10.0 },
  { coins: 200, price: 20.0 },
  { coins: 400, price: 40.0 },
  { coins: 600, price: 60.0 },
  { coins: 800, price: 80.0 },
  { coins: 1000, price: 100.0 },
];

const ForevergreenCoins = () => {
  return (
    <View style={styles.container}>
      <PageHeader
        subtitle="Forevergreen Coins"
        description="Buy Coins to Spend on Forevergreen Products"
      />
      <BackButton />
      <ScrollView>
        {coinOptions.map((option, index) => (
          <View key={index} style={styles.coinOption}>
            <LinearGradient
              colors={["#34C759", "#409858", "#25532E"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.gradient}
            >
              <Image source={FGCoin} style={styles.bigCoinImage} />
            </LinearGradient>
            <View style={styles.coinInfo}>
              <View style={styles.coinDetails}>
                <View style={styles.coinAmountWrapper}>
                  <Image source={FGCoin} style={styles.smallCoinImage} />
                  <Text style={styles.coinAmount}>{option.coins}</Text>
                </View>
                <Text style={styles.coinPrice}>${option.price.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    fontSize: 16,
    color: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  coinCount: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinCountText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  coinOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
  },
  gradient: {
    width: 112,
    height: 112,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
  bigCoinImage: {
    width: 80,
    height: 86,
  },
  coinInfo: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: 12,
  },
  coinDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 15,
  },
  smallCoinImage: {
    width: 27,
    height: 29,
  },
  coinAmountWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  coinAmount: {
    fontSize: 24,
    fontWeight: "semibold",
  },
  coinPrice: {
    fontSize: 32,
    fontWeight: "bold",
  },
  buyButton: {
    backgroundColor: "#409858",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: "auto",
    fontSize: 18,
  },
  buyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ForevergreenCoins;
