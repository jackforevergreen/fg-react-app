import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import Icon from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";

const Header = ({ progress, title }: any) => {
  return (
    <>
      <View style={styles.container}>
        <Icon
          name="arrow-left"
          size={24}
          color="black"
          onPress={() => router.back()}
          style={styles.backButton}
        />
        <View style={styles.progressBarContainer}>
          <Progress.Bar
            progress={progress}
            width={null}
            color="#AEDCA7"
            unfilledColor="#FFF"
            borderColor="#000"
            borderWidth={1.5}
            height={15}
            borderRadius={9999}
          />
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  backButton: {
    marginRight: 24,
  },
  progressBarContainer: {
    flex: 1,
  },
  title: {
    fontSize: 36,
    marginTop: 24,
  },
});
