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
  const [password0Value, setPassword0Value] = useState("");
  const [password1Value, setPassword1Value] = useState("");

  const onSignUpSuccess = (cred) => {
    Alert.alert("Check your email and confirm it!");
  };

  const onSignUpFailure = (error) => {
    console.log(error);
    Alert.alert("Error", "Couldn't sign up!", [
      { text: "Ok", style: "default" },
    ]);
  };

  const SignUpHandler = () => {
    if (password0Value !== password1Value) {
      Alert.alert("Error", "Your passwords don't match!", [
        { text: "Ok", style: "cancel" },
      ]);
      return;
    }
    fire.auth
      .createUserWithEmailAndPassword(emailValue, password0Value)
      .then(onSignUpSuccess)
      .catch(onSignUpFailure);
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
          style={{ ...styles.input, ...{ marginBottom: 30 } }}
          onChangeText={(text) => setEmailValue(text)}
        ></TextInput>
        <Text style={styles.instructions}>Enter your password:</Text>
        <TextInput
          autoCorrect={false}
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => setPassword0Value(text)}
        ></TextInput>
        <Text style={styles.instructions}>Confirm your password:</Text>
        <TextInput
          autoCorrect={false}
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => setPassword1Value(text)}
        ></TextInput>
        <TouchableOpacity onPress={SignUpHandler}>
          <View style={styles.loginButton}>
            <Text
              style={{
                color: styles.loginButton.color,
                fontSize: styles.loginButton.fontSize,
              }}
            >
              Sign in
            </Text>
          </View>
        </TouchableOpacity>

        <Button
          title="Already have an account? Log in!"
          onPress={() => navigation.navigate("Login")}
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
