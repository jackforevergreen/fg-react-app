import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { router } from "expo-router";
export const ShoppingCartBtn = ({ numItems }: { numItems: number }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  cartContainer: {
    position: "absolute",
    top: 72,
    right: 16,
    height: 44,
    width: 44,
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
