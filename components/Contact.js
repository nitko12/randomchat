import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function (props) {
  return (
    <View style={{ ...styles.main, ...props.style }}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.message}>{props.message}</Text>
      <Text style={styles.time}>{props.time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 2,
    width: "100%",
    height: 90,
    borderRadius: 10,
    shadowColor: "black",
    shadowRadius: 2,
    shadowOpacity: 0.7,
    shadowOffset: { width: 2, height: 0 },
    backgroundColor: "white",
  },
  title: {},
  message: {},
  time: {},
});
