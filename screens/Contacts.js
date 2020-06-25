import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  FlatList,
  Switch,
} from "react-native";

const geohash = require("ngeohash");

import Constants from "expo-constants";
import * as Location from "expo-location";

import fire from "../fire";

import InfiniteScroll from "../components/InfiniteScroll";

const db = fire.firestore;

import Header from "../components/Header";

export default function ({ navigation }) {
  const onLogOutSuccess = () => {
    navigation.navigate("Loading");
  };

  const onLogOutFailure = (error) => {
    Alert.alert("Error", "Couldn't log out!", [
      { text: "Ok", style: "cancel" },
    ]);
  };

  const logOut = () => {
    fire.auth.signOut().then(onLogOutSuccess).catch(onLogOutFailure);
  };

  useEffect(() => {
    db.collection("visible")
      .where("uid", "==", fire.auth.currentUser.uid)
      .get()
      .then((user) => {
        if (!user.empty) setIsEnabled(true);
      });
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Error",
        "Please grant permission for accessing your location!",
        [{ text: "Ok", style: "cancel" }]
      );
      return null;
    }

    let location = await Location.getCurrentPositionAsync({});

    return location;
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => {
      db.collection("visible")
        .where("uid", "==", fire.auth.currentUser.uid)
        .get()
        .then(async (user) => {
          if (user.empty && !previousState) {
            const location = await getLocation();
            if (location)
              db.collection("visible")
                .doc()
                .set({
                  uid: fire.auth.currentUser.uid,
                  position: geohash.encode(
                    location.coords.latitude,
                    location.coords.longitude,
                    4
                  ),
                });
            else {
              setIsEnabled((prev) => !prev);
            }
          }
          if (!user.empty && previousState) {
            db.collection("visible")
              .where("uid", "==", fire.auth.currentUser.uid)
              .get()
              .then((snap) => {
                snap.forEach((doc) => {
                  doc.ref.delete();
                });
              });
          }
        });

      return !previousState;
    });
  };

  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        center={<Button title="signOut" onPress={logOut} />}
        left={
          <View style={styles.container}>
            <Text style={{ color: "#fff" }}>Publicly visible</Text>
            <Switch
              onValueChange={toggleSwitch}
              value={isEnabled}
              ios_backgroundColor="#3e3e3e"
            />
          </View>
        }
        right={
          <View style={styles.container}>
            <Button
              title="Find Contact"
              onPress={() => navigation.navigate("AddNewChat")}
            />
          </View>
        }
      />

      <InfiniteScroll collection={db.collection("Debug_contacts")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 0.1,
  },
});
