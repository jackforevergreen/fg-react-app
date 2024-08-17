import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { formatPrice } from "@/utils/format";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

interface CreditItemProps {
  name: string;
  price: number;
  image: string;
  colors: string[];
  onPress: () => void;
}

const CreditItem: React.FC<CreditItemProps> = ({
  name,
  price,
  image,
  colors,
  onPress,
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress} style={styles.touchable}>
      <LinearGradient
        colors={colors}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      >
        <Image
          source={image}
          placeholder={{ blurhash }}
          style={styles.icon}
          contentFit="cover"
        />
      </LinearGradient>
      <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
        {name}
      </Text>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>{formatPrice(price)}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 176,
    width: 112,
  },
  touchable: {
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
  icon: {
    height: 75,
    width: 70,
  },
  name: {
    fontSize: 16,
    marginTop: 4,
    marginBottom: 16,
    minHeight: 48,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreditItem;
