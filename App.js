import React, { useEffect } from "react";
import { View, Text, Vibration, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./screens/Login";
import Signin from "./screens/Signin";
import Contacts from "./screens/Contacts";
import Loading from "./screens/Loading";
import AddNewChat from "./screens/AddNewChat";

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Contacts" component={Contacts} />
          <Stack.Screen name="AddNewChat" component={AddNewChat} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
