import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function ({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Lol</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
