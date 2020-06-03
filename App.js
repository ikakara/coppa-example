import * as React from "react";
import { View, Image, StyleSheet, Platform } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LinkingConfiguration from "./src/navigation/LinkingConfiguration";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";

import UserScreenStack from "./src-stack/screens/UserScreenStack";
import UserScreenModal from "./src-stack/screens/UserScreenModal";
import ProductScreenStack from "./src-stack/screens/ProductScreenStack";
import ProductScreenModal from "./src-stack/screens/ProductScreenModal";
import TodoScreenStack from "./src-stack/screens/TodoScreenStack";
import TodoScreenModal from "./src-stack/screens/TodoScreenModal";

import Amplify from "@aws-amplify/core";
import config from "./aws-exports";
Amplify.configure(config);

import { withAuthenticator } from "aws-amplify-react-native";

function LogoTitle() {
  const navigation = useNavigation();
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={
        __DEV__
          ? require("./assets/images/robot-dev.png")
          : require("./assets/images/robot-prod.png")
      }
    />
  );
}

const RootStack = createStackNavigator();

// this is a stack navigation design
function RootStackScreen(props) {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen name="User" component={UserScreenStack} {...props} />
      <RootStack.Screen
        name="Product"
        component={ProductScreenStack}
        {...props}
      />
      <RootStack.Screen name="Todo" component={TodoScreenStack} {...props} />
      <RootStack.Screen
        name="ModalUser"
        component={UserScreenModal}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ModalProduct"
        component={ProductScreenModal}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ModalTodo"
        component={TodoScreenModal}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}

// this is a bottom tab navigation design
function RootTabScreen(props) {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Root"
        component={BottomTabNavigator}
        {...props} // options={{ headerShown: false }} or {...props}
      />
      <RootStack.Screen
        name="ModalUser"
        component={UserScreenModal}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ModalProduct"
        component={ProductScreenModal}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}

function App() {
  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      <NavigationContainer linking={LinkingConfiguration}>
        <RootStackScreen // RootStackScreen or RootTabScreen
          options={({ navigation, route }) => ({
            headerRight: (props) => <LogoTitle {...props} />,
            headerRightContainerStyle: {
              paddingRight: 16,
            },
          })}
        />
      </NavigationContainer>
    </View>
  );
}

export default withAuthenticator(App);
//export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
