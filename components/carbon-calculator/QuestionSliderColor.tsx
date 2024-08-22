import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Slider } from "@react-native-assets/slider";

const QuestionSlider = ({
  question,
  value,
  onChange,
  minimumValue,
  maximumValue,
}: {
  question: string;
  value: number;
  onChange: (value: number) => void;
  minimumValue: number;
  maximumValue: number;
}) => {
  
  const getColor = () => {
    if (value <= 2) {
      return { trackColor: "#008450", thumbColor: "#008450" }; // Green shades
    } else if (value <= 5) {
      return { trackColor: "#EFB700", thumbColor: "#EFB700" }; // Yellow shades
    } else {
      return { trackColor: "#B81D13", thumbColor: "#B81D13" }; // Red shades
    }
  };

  const { trackColor, thumbColor } = getColor();

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question}</Text>
      <View style={styles.sliderContainer}>
        <Slider
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          step={1}
          value={value}
          onValueChange={onChange}
          minimumTrackTintColor={trackColor} // Dynamic track color
          maximumTrackTintColor="#D9D9D9"
          thumbTintColor={thumbColor}        // Dynamic thumb color
          trackHeight={9}
          thumbSize={25}
          CustomMark={({ value, active }) => (
            <View style={styles.labelsContainer}>
              {active ? (
                <Text style={styles.activeLabel}>{value < 7 ? value : "7+"}</Text>
              ) : (
                <Text style={styles.labelText}>{value < 7 ? value : "7+"}</Text>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default QuestionSlider;

const styles = StyleSheet.create({
  container: {
    marginVertical: 32,
  },
  questionText: {
    fontSize: 20,
    marginTop: 32,
  },
  sliderContainer: {
    marginTop: 16,
  },
  labelsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 64,
    backgroundColor: "transparent",
    height: 18,
    width: 18,
    marginRight: -9,
  },
  labelText: {
    textAlign: "center",
    color: "black",
    fontSize: 14,
  },
  activeLabel: {
    fontWeight: "bold",
  },
});
