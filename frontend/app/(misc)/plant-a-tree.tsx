import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

type TreeOption = {
  name: string;
  price: number;
  image: any;
  description: string;
};

const treeOptions: TreeOption[] = [
  {
    name: "Costa Rican Teak Tree",
    price: 10.0,
    image: require("../../assets/images/teak-tree-1.png"),
    description:
      "Planting teak helps reforest areas, supports wildlife habitats, and absorbs carbon, aiding in climate change mitigation.",
  },
  {
    name: "PA Oak Tree",
    price: 10.0,
    image: require("../../assets/images/oak-tree-1.png"),
    description:
      "Oak trees provide essential ecological benefits, such as biodiversity, stabilizing soil, and offering vital habitat and food sources for various wildlife species.",
  },
  {
    name: "Brazilian Pepper Tree",
    price: 10.0,
    image: require("../../assets/images/pepper-tree-1.png"),
    description:
      "Planting Pepper trees helps regenerate rain forest in Brazil while cooling down temperatures.",
  },
];

export default function PlantTreeScreen() {
  const handleTreeSelect = (tree: TreeOption) => {
    router.push({
      pathname: "/checkout",
      params: { tree: JSON.stringify(tree) },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>
            Forever<Text style={styles.greenText}>green</Text>
          </Text>
          <Text style={styles.subtitle}>Plant a Tree!</Text>
        </View>
      </View>
      <ScrollView style={styles.treeList}>
        {treeOptions.map((tree, index) => (
          <Pressable
            key={index}
            style={styles.treeItem}
            onPress={() => handleTreeSelect(tree)}
          >
            <View style={styles.treeItemContent}>
              <Image source={tree.image} style={styles.treeImage} />
              <View style={styles.treeInfo}>
                <Text style={styles.treeName}>{tree.name}</Text>
                <Text style={styles.treePrice}>${tree.price.toFixed(2)}</Text>
                <Text style={styles.treeDescription}>{tree.description}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    paddingTop: 24,
  },
  headerContent: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
  },
  greenText: {
    color: "#409858",
  },
  subtitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  treeList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  treeItem: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  treeItemContent: {
    flexDirection: "row",
    padding: 16,
  },
  treeImage: {
    width: 96,
    height: 96,
    marginRight: 16,
  },
  treeInfo: {
    flex: 1,
  },
  treeName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#15803D",
  },
  treePrice: {
    fontSize: 18,
    fontWeight: "600",
  },
  treeDescription: {
    fontSize: 14,
    marginTop: 8,
  },
});
