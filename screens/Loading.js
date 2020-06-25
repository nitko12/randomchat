import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import fire from "../fire";
const db = fire.firestore;

export default function ({ navigation }) {
  const checkLoggedIn = () => {
    fire.auth.onAuthStateChanged(function (user) {
      if (user) {
        db.collection("visible")
          .where("uid", "==", user.uid)
          .get()
          .then((snap) => {
            snap.forEach((el) => {
              el.ref.set(
                {
                  lastLogin: fire.firestoreRef.Timestamp.fromDate(new Date()),
                },
                { merge: true }
              );
            });
          });

        navigation.navigate("Contacts");
      } else {
        navigation.navigate("Login");
      }
    });
  };
  useEffect(checkLoggedIn);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large"></ActivityIndicator>
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
