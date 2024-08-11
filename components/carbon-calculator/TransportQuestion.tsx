import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { RadioButton, TextInput, HelperText } from "react-native-paper";

const TransportQuestion = ({
  question,
  useTransport,
  setUseTransport,
  frequency,
  setFrequency,
  frequencyError,
  label,
  validateNumber,
}: any) => {
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (useTransport === "No") {
      setFrequency("0");
    }
  }, [useTransport, setFrequency]);
  useEffect(() => {
    if (useTransport === "Yes") {
      setFrequency("1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useTransport]);

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question}</Text>
      <View style={styles.optionsContainer}>
        <View style={styles.optionsColumn}>
          {["Yes", "No"].map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => setUseTransport(option)}
              activeOpacity={0.7}
            >
              <View style={styles.optionRow}>
                <RadioButton.Android
                  value={option}
                  status={useTransport === option ? "checked" : "unchecked"}
                  onPress={() => setUseTransport(option)}
                  color="#44945F"
                  uncheckedColor="#808080"
                />
                <Text style={styles.optionText}>{option}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {useTransport === "Yes" && (
          <View style={styles.frequencyContainer}>
            <Text style={styles.frequencyLabel}>How many times a week?</Text>
            <TextInput
              ref={inputRef}
              placeholder=""
              value={frequency}
              onChangeText={(value) => validateNumber(value, setFrequency)}
              keyboardType="numeric"
              mode="outlined"
              outlineStyle={{
                borderWidth: 0,
              }}
              style={styles.textInput}
              dense={true}
              textColor="#000"
              right={
                label ? (
                  <TextInput.Affix text={label} textStyle={{ color: "#000" }} />
                ) : null
              }
            />
            <HelperText type="error" visible={!!frequencyError}>
              {frequencyError}
            </HelperText>
          </View>
        )}
      </View>
    </View>
  );
};

export default TransportQuestion;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  questionText: {
    fontSize: 20,
    marginTop: 32,
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
  },
  optionsColumn: {
    marginLeft: -8,
    width: "50%",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
  },
  frequencyContainer: {
    width: "50%",
  },
  frequencyLabel: {
    fontSize: 14,
  },
  textInput: {
    height: 40,
    backgroundColor: "#FFF",
    width: "auto",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    borderRadius: 8,
    marginTop: 16,
  },
});
