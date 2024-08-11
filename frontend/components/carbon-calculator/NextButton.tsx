import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";

const NextButton = ({
  isFormValid,
  onNext,
  saveData,
}: {
  isFormValid: boolean;
  onNext: string;
  saveData?: () => void;
}) => {
  const router = useRouter();

  const handlePress = async () => {
    if (isFormValid) {
      router.navigate(onNext);
      if (saveData) {
        saveData();
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <View
          style={[
            styles.button,
            isFormValid ? styles.validButton : styles.invalidButton,
          ]}
        >
          <Icon
            name="arrow-right"
            size={30}
            color={isFormValid ? "#000" : "#AAA"}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 40,
    marginRight: 40,
  },
  button: {
    padding: 12,
    borderRadius: 9999, // Very large number to ensure circular shape
    borderWidth: 2,
    height: 64,
    width: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  validButton: {
    borderColor: "black",
    backgroundColor: "#AEDCA7",
  },
  invalidButton: {
    borderColor: "#D1D5DB", // Equivalent to Tailwind's gray-300
    backgroundColor: "#D1D5DB",
  },
});
