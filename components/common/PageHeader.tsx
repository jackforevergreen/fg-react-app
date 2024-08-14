import { View, Text, StyleSheet } from "react-native";

export const PageHeader = ({
  subtitle,
  description,
}: {
  subtitle: string;
  description: string;
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>
          Forever<Text style={styles.titleGreen}>green</Text>
        </Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 24,
  },
  headerContent: {
    alignItems: "center",
    marginTop: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  titleGreen: {
    color: "#409858",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
});
