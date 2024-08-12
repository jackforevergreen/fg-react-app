import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import { FGCoin } from "@/constants/Images";
import { useCart } from "@/contexts";
import BackButton from "@/components/BackButton";
import { CartItem } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Feather";

export default function ShoppingCartScreen() {
  const { items, getCartTotal, incrementQuantity, decrementQuantity } =
    useCart();

  const renderItem = ({ item }: { item: CartItem }) => (
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
            onPress={() => decrementQuantity(item.id)}
            style={styles.quantityButton}
          >
            <Icon name="minus" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => incrementQuantity(item.id)}
            style={styles.quantityButton}
          >
            <Icon name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Image source={FGCoin} style={styles.coinImage} />
        <Text style={styles.itemPrice}>{item.price * item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.greenCircleLarge} />
      <View style={styles.greenCircleSmall} />
      <BackButton />
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Forever<Text style={styles.headerTitleGreen}>green</Text>
          </Text>
          <Text style={styles.headerSubtitle}>Shopping Cart</Text>
          <Text style={styles.headerText}>
            Make a Positive Impact on the Environment Today!
          </Text>
        </View>
      </View>

      <View style={styles.creditList}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <View style={styles.totalValue}>
            <Image source={FGCoin} style={styles.coinImage} />
            <Text style={styles.totalValueText}>{getCartTotal()}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.purchaseButton}>
          <Text style={styles.purchaseButtonText}>
            Not Enough Forevergreen Coins. Buy now?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
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
  headerContainer: {
    paddingTop: 24,
  },
  header: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "bold",
  },
  headerTitleGreen: {
    color: "#409858",
  },
  headerSubtitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
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
    fontSize: 16,
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
});
