import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
} from "react-native";
import { Image } from "expo-image";
import Icon from "react-native-vector-icons/Feather";
import { CarbonCredit } from "@/types";
import { FGCoin } from "@/constants/Images";
import { useCart } from "@/contexts";

const ProjectCard: React.FC<{ project: CarbonCredit }> = ({ project }) => {
  const [quantity, setQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const { addToCart } = useCart();

  const toggleExpanded = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  }, []);

  const incrementQuantity = useCallback(
    () => setQuantity((prev) => prev + 1),
    []
  );
  const decrementQuantity = useCallback(
    () => setQuantity((prev) => Math.max(1, prev - 1)),
    []
  );

  const navigateDetails = useCallback(
    (direction: "next" | "prev") => {
      setCurrentPage((prev) => {
        if (direction === "next") {
          return (prev + 1) % project.details.length;
        } else {
          return (prev - 1 + project.details.length) % project.details.length;
        }
      });
    },
    [project.details.length]
  );

  const handleAddToCart = useCallback(() => {
    addToCart(project, quantity);
    setQuantity(1);
  }, [addToCart, project, quantity]);

  if (!project) return null;

  const currentDetail = project.details[currentPage];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{project.name}</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>{currentDetail.title}</Text>
        <Text
          style={[
            styles.detailContent,
            !expanded && styles.detailContentCollapsed,
          ]}
          numberOfLines={expanded ? undefined : 3}
        >
          {currentDetail.content}
        </Text>
        <TouchableOpacity
          onPress={toggleExpanded}
          style={styles.showMoreButton}
        >
          <Text style={styles.showMoreText}>
            {expanded ? "Show Less" : "Show More"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => navigateDetails("prev")}>
          <Icon name="chevron-left" size={48} />
        </TouchableOpacity>

        <Image source={project.image} style={styles.projectImage} />

        <View style={styles.priceContainer}>
          <View style={styles.coinContainer}>
            <Image source={FGCoin} style={styles.coinImage} />
            <Text style={styles.priceText}>{project.price * quantity}</Text>
          </View>
          <View style={styles.perTonContainer}>
            <Text style={styles.perTonText}>per ton</Text>
            <Text style={styles.perTonText}>CO2</Text>
          </View>
        </View>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={decrementQuantity}
            style={styles.quantityButton}
          >
            <Icon name="minus" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            onPress={incrementQuantity}
            style={styles.quantityButton}
          >
            <Icon name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigateDetails("next")}>
          <Icon name="chevron-right" size={48} />
        </TouchableOpacity>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <View style={styles.totalPriceContainer}>
          <Image source={FGCoin} style={styles.coinImage} />
          <Text style={styles.totalPriceText}>{project.price * quantity}</Text>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Icon
            name="shopping-cart"
            size={18}
            color="#fff"
            style={styles.cartIcon}
          />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProjectCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EEEEEE",
    borderRadius: 16,
    padding: 15,
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailContent: {
    fontSize: 16,
    lineHeight: 24,
  },
  detailContentCollapsed: {
    height: 72, // Approximately 3 lines of text
  },
  showMoreButton: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  showMoreText: {
    color: "#409994",
    fontWeight: "bold",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    gap: 16,
  },
  projectImage: {
    height: 75,
    width: 70,
  },
  priceContainer: {
    flexDirection: "row",
    gap: 0,
    alignItems: "baseline",
  },
  coinContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  coinImage: {
    height: 24,
    width: 24,
  },
  priceText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  perTonContainer: {
    marginLeft: 8,
    marginTop: 24,
  },
  perTonText: {
    lineHeight: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    marginHorizontal: 4,
    textAlign: "center",
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
    justifyContent: "flex-end",
  },
  totalText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  totalPriceContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  totalPriceText: {
    fontSize: 30,
  },
  addToCartButton: {
    backgroundColor: "#409858",
    padding: 8,
    borderRadius: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cartIcon: {
    padding: 8,
  },
  addToCartText: {
    color: "white",
    fontWeight: "bold",
    padding: 8,
  },
});
