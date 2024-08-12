import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import Icon from "react-native-vector-icons/Feather";
import PagerView from "react-native-pager-view";
import { CarbonCredit } from "@/types";
import { FGCoin } from "@/constants/Images";
import { useCart } from "@/contexts";

const ProjectCard = ({ project }: { project: CarbonCredit }) => {
  const [quantity, setQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const { addToCart } = useCart();

  const pagerRef = useRef<PagerView>(null);

  const toggleExpanded = () => setExpanded(!expanded);
  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(Math.max(1, quantity - 1));

  const navigateDetails = (direction: "next" | "prev") => {
    if (direction === "next") {
      pagerRef.current?.setPage((currentPage + 1) % project.details.length);
    } else {
      pagerRef.current?.setPage(
        (currentPage - 1 + project.details.length) % project.details.length
      );
    }
  };

  pagerRef.current?.setScrollEnabled(true);

  const handleAddToCart = () => {
    addToCart(project, quantity);
    setQuantity(1);
  };
  
  if (!project) return null;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{project.name}</Text>

        <PagerView
          ref={pagerRef}
          initialPage={0}
          onPageSelected={(e) => {
            setCurrentPage(e.nativeEvent.position);
          }}
          style={[styles.pagerView, { height: expanded ? 300 : 140 }]}
        >
          {project.details.map((detail, index) => (
            <View key={index}>
              <Text style={styles.detailTitle}>{detail.title}</Text>
              <ScrollView
                style={[
                  styles.scrollView,
                  { maxHeight: expanded ? undefined : 80 },
                ]}
                scrollEnabled={expanded}
              >
                <Text style={styles.detailContent}>
                  {detail.content.split("\n").map((item, idx) => {
                    const parts = item.split(":");
                    return (
                      <Text key={idx}>
                        {parts.length > 1 ? (
                          <>
                            <Text style={styles.boldText}>{parts[0]}:</Text>
                            {parts.slice(1).join(":")}
                          </>
                        ) : (
                          item
                        )}
                        {"\n"}
                      </Text>
                    );
                  })}
                </Text>
              </ScrollView>
              {detail.content.length > 60 && (
                <TouchableOpacity
                  onPress={toggleExpanded}
                  style={styles.showMoreButton}
                >
                  <Text style={styles.showMoreText}>
                    {expanded ? "Show Less" : "Show More"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </PagerView>
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
  pagerView: {
    flex: 1,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  scrollView: {
    overflow: "hidden",
  },
  detailContent: {
    fontSize: 18,
    lineHeight: 24,
  },
  boldText: {
    fontWeight: "bold",
  },
  showMoreButton: {
    marginTop: 8,
  },
  showMoreText: {
    color: "#409994",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
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
