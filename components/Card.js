import React from "react";
import { View, StyleSheet } from "react-native";

export default function (props) {
  return (
    <View style={{ ...styles.main, ...props.style }}>{props.children}</View>
  );
}

const styles = StyleSheet.create({
  main: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",

    padding: 20,

    borderRadius: 10,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 0.7,
    shadowOffset: { width: 2, height: 0 },
    backgroundColor: "white",
  },
});
