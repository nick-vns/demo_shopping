import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ShoppingLists from "./components/ShoppingLists";
import Welcome from "./components/Welcome";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";

const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

export default function App() {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  const firebaseConfig = {
    apiKey: "AIzaSyCjsL1Lj3-q8Bea1MqigEgpZEYAN-0PLGM",
    authDomain: "shopping-list-demo-13e1e.firebaseapp.com",
    projectId: "shopping-list-demo-13e1e",
    storageBucket: "shopping-list-demo-13e1e.appspot.com",
    messagingSenderId: "901033793870",
    appId: "1:901033793870:web:6043e7452cdfcd77c1661f",
    measurementId: "G-MCHLCTWYMK",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="ShoppingLists">
          {(props) => (
            <ShoppingLists
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
