import React from "react";

import { Colors } from "../config/Colors";
import { View, StyleSheet } from "react-native";

export default function (props) {
  return (
    <View style={{ ...styles.main, ...props.style }}>
      <View style={styles.left}>{props.left}</View>
      <View style={styles.center}>{props.center}</View>
      <View style={styles.right}>{props.right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    color: "white",
    width: "100%",
    flex: 0.1,
    backgroundColor: Colors.primary,
    shadowRadius: 5,
    shadowOpacity: 0.7,
    shadowOffset: { width: 2, height: 0 },
    alignContent: "space-between",
  },
  left: {
    flex: 1 / 3,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 12,
  },
  center: {
    flex: 1 / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    flex: 1 / 3,
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 12,
  },
});
