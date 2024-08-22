import React, { useRef } from "react";
import { Text, StyleSheet } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

const NumberInput = ({
  question,
  value,
  onChange,
  unit,
  label,
  error,
}: {
  question: string;
  value: string;
  onChange: (value: string) => void;
  unit?: string;
  label?: string;
  error?: string;
}) => {
  const inputRef = useRef<any>(null);

  return (
    <>
      <Text style={styles.question}>{question}</Text>
      <TextInput
        ref={inputRef}
        placeholder="Your Answer"
        value={value}
        onChangeText={onChange}
        keyboardType="numeric"
        mode="outlined"
        outlineStyle={styles.outlineStyle}
        outlineColor="#D9D9D9"
        style={styles.input}
        textColor="#000"
        right={
          label ? (
            <TextInput.Affix text={label} textStyle={styles.affixText} />
          ) : null
        }
        left={
          unit ? (
            <TextInput.Affix text={unit} textStyle={styles.affixText} />
          ) : null
        }
      />
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
    </>
  );
};

const styles = StyleSheet.create({
  question: {
    marginTop: 24,
    fontSize: 20,
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    marginTop: 16,
  },
  outlineStyle: {
    borderWidth: 1,
    borderRadius: 10,
  },
  affixText: {
    color: "#000",
  },
});

export default NumberInput;
