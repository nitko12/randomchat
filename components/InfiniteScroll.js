import React, { useState, useRef, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  FlatList,
} from "react-native";

import Contact from "../components/Contact";

const preload = 3;
let listeners = {};

export default function (props) {
  const coll = props.collection;
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState([]);

  const cleanUp = () => {
    Object.values(listeners).forEach((f) => {
      f();
    });
    listeners = {};
  };

  useEffect(() => {
    let f = coll
      .orderBy("time", "desc")
      .limit(preload)
      .onSnapshot((querySnapshot) => {
        let map = contacts.reduce(function (map, obj) {
          map[obj.uid] = obj;
          return map;
        }, {});

        querySnapshot.forEach((documentSnapshot) => {
          let data = documentSnapshot.data();
          map[data.uid] = data;
        });

        let a = [];
        for (const [key, value] of Object.entries(map)) {
          a.push(value);
        }

        a.sort((a, b) => {
          return a.time.toDate() < b.time.toDate();
        });

        setContacts(a);

        setLoading(false);
      });

    listeners["0"] = f;

    return () => {
      cleanUp();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  const loadMore = () => {
    let last = contacts[contacts.length - 1];

    if (listeners.hasOwnProperty(last.uid)) return;

    let f = coll
      .orderBy("time", "desc")
      .startAfter(last.time)
      .limit(preload)
      .onSnapshot((querySnapshot) => {
        let map = contacts.reduce(function (map, obj) {
          map[obj.uid] = obj;
          return map;
        }, {});

        querySnapshot.forEach((documentSnapshot) => {
          let data = documentSnapshot.data();
          map[data.uid] = data;
        });

        let a = [];
        for (const [key, value] of Object.entries(map)) {
          a.push(value);
        }

        a.sort((a, b) => {
          return a.time.toDate() < b.time.toDate();
        });

        setContacts(a);
      });

    listeners[last.uid] = f;
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1, width: "100%" }}
        data={contacts}
        renderItem={({ item }) => (
          <Contact
            title={item.uid}
            message={item.message}
            time={item.time.toString()}
            uid={item.uid}
          />
        )}
        keyExtractor={(item) => item.uid}
        onEndReached={() => {
          loadMore();
        }}
        onEndReachedThreshold={0}
      ></FlatList>
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
});
