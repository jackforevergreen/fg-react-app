import { useState } from "react";
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
  const [localValue, setLocalValue] = useState(value);

  const handleSlidingComplete = (newValue: number) => {
    onChange(newValue);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question}</Text>
      <View style={styles.sliderContainer}>
        <Slider
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          step={1}
          value={localValue}
          onValueChange={setLocalValue}
          onSlidingComplete={handleSlidingComplete}
          minimumTrackTintColor="#8E8F8E"
          maximumTrackTintColor="#D9D9D9"
          thumbTintColor="#8E8F8E"
          trackHeight={9}
          thumbSize={20}
          CustomMark={({ value, active }) => (
            <View style={styles.labelsContainer}>
              {active ? (
                <Text style={styles.activeLabel}>
                  {value < 7 ? value : "7+"}
                </Text>
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
