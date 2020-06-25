import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Slider,
} from "react-native";

import Header from "../components/Header";
import Card from "../components/Card";

export default function ({ navigation }) {
  const findFarHandler = () => {};
  const findNearHandler = () => {};

  const [moveActivityNear, setMoveActivityNear] = useState("1 day");
  const moveActivityNearHandler = (val) => {
    const smoothness = 100;
    const days = ((Math.pow(smoothness, val) - 1) / (smoothness - 1)) * 180;

    let s = "";

    if (days >= 30) s += Math.floor(days / 30) + " months ";

    if (days % 30 != 0) s += Math.floor(days % 30) + " days ";

    if (days <= 10) s += Math.floor((days % 1) * 24) + " hours";

    setMoveActivityNear(s);
  };

  return (
    <View style={styles.container}>
      <Header
        left={
          <View>
            <Button title="Back" onPress={() => navigation.goBack()} />
          </View>
        }
        center={<Text>Contact finder</Text>}
      ></Header>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Text>Find Near Contact</Text>
          <View style={{ flex: 1 }}></View>

          <View style={styles.container}>
            <Text>{moveActivityNear}</Text>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0.005}
              maximumValue={1}
              minimumTrackTintColor="#AAAAAA"
              maximumTrackTintColor="#000000"
              onValueChange={moveActivityNearHandler}
            />
          </View>

          <TouchableOpacity onPress={findNearHandler}>
            <View style={styles.button}>
              <Text
                style={{
                  color: styles.button.color,
                  fontSize: styles.button.fontSize,
                }}
              >
                Go
              </Text>
            </View>
          </TouchableOpacity>
        </Card>
        <Card style={styles.card}>
          <Text>Find Far Contact</Text>
          <View style={{ flex: 1, width: "100%" }}></View>

          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#AAAAAA"
            maximumTrackTintColor="#000000"
          />

          <TouchableOpacity onPress={findFarHandler}>
            <View style={styles.button}>
              <Text
                style={{
                  color: styles.button.color,
                  fontSize: styles.button.fontSize,
                }}
              >
                Go
              </Text>
            </View>
          </TouchableOpacity>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  card: {
    flex: 0.5,
    width: "90%",
    margin: 10,
  },
  button: {
    color: "red",
    fontSize: 20,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
});
