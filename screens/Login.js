import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from "react-native";

import fire from "../fire";
import Card from "../components/Card";

export default function ({ navigation }) {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const onLoginSuccess = () => {
    navigation.navigate("Contacts");
  };

  const onLoginFailure = (error) => {
    Alert.alert("Error", "Couldn't login, check your email and password!", [
      { text: "Ok", style: "default" },
    ]);
  };

  const loginHandler = () => {
    fire.auth
      .signInWithEmailAndPassword(emailValue, passwordValue)
      .then(onLoginSuccess)
      .catch(onLoginFailure);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Card style={styles.loginForm}>
        <Text style={styles.instructions}>Enter your email:</Text>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
          style={styles.input}
          onChangeText={(text) => setEmailValue(text)}
        ></TextInput>
        <Text style={styles.instructions}>Enter your password:</Text>
        <TextInput
          autoCorrect={false}
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => setPasswordValue(text)}
        ></TextInput>
        <TouchableOpacity onPress={loginHandler}>
          <View style={styles.loginButton}>
            <Text
              style={{
                color: styles.loginButton.color,
                fontSize: styles.loginButton.fontSize,
              }}
            >
              Log in
            </Text>
          </View>
        </TouchableOpacity>
        <Button
          title="Don't have an account? Sign in!"
          onPress={() => navigation.navigate("Signin")}
        />
      </Card>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginForm: {},
  instructions: {
    fontSize: 25,
  },
  input: {
    fontSize: 25,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: 300,
    maxWidth: "70%",
    textAlign: "center",
    margin: 10,
    padding: 2,
  },
  loginButton: {
    color: "red",
    fontSize: 20,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
});
