import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Earth } from "@/constants/Images";

const EarthBreakdown = ({ emissions }: any) => {
  const earthsRequired = parseFloat((emissions / 6.4).toFixed(2)); // 6.4 tonne of CO2 per year as the target
  const wholeEarths = Math.floor(earthsRequired);
  const partialEarth = parseFloat((earthsRequired - wholeEarths).toFixed(2));

  const renderEarths = () => {
    const earthImages = [];
    for (let i = 0; i < (wholeEarths > 11 ? 11 : wholeEarths); i++) {
      earthImages.push(
        <Image
          key={`whole-${i}`}
          source={Earth}
          style={{ height: 64, width: 64, marginRight: 8 }}
        />
      );
    }
    if (partialEarth > 0) {
      earthImages.push(
        <View
          key="partial"
          style={{
            overflow: "hidden",
            height: 64,
            width: 64 * partialEarth, // Adjust width to show partial Earth
            marginRight: 8,
          }}
        >
          <Image source={Earth} style={{ height: 64, width: 64 }} />
        </View>
      );
    }

    // Create rows of images
    const rows = [];
    const itemsPerRow = 4;
    for (let i = 0; i < earthImages.length; i += itemsPerRow) {
      const rowItems = earthImages.slice(i, i + itemsPerRow);
      rows.push(
        <View key={`row-${i}`} style={styles.row}>
          {rowItems}
        </View>
      );
    }

    return rows;
  };

  return <View>{renderEarths()}</View>;
};

export default EarthBreakdown;

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 8,
  },
});
