import * as React from "react";
import { View, Image, StyleSheet, Platform, Text } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import useCachedResources from "./src/hooks/useCachedResources";
import LinkingConfiguration from "./src/navigation/LinkingConfiguration";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";

import { UserScreen } from "./src/screens";
import {
  UserScreenStack,
  UserScreenModal,
  TemplateScreenStack,
  TemplateScreenModal,
  TodoScreenStack,
  TodoScreenModal,
} from "./src-stack/screens";

import Amplify from "@aws-amplify/core";
import config from "./aws-exports";
Amplify.configure(config);

import {
  withAuthenticator,
  AmplifyAuthenticator,
  AmplifySignOut,
} from "aws-amplify-react-native";

// {/* */}
export function LogoTitle() {
  const navigation = useNavigation();
  return (
    /*  <AmplifyAuthenticator>
      <Text>
        My App
        <AmplifySignOut />
      </Text>
    </AmplifyAuthenticator>*/
    <View>
      <Text>this is a bunch of text</Text>
      <Image
        style={{ width: 50, height: 50 }}
        source={
          __DEV__
            ? require("./assets/images/robot-dev.png")
            : require("./assets/images/robot-prod.png")
        }
      />
    </View>
  );
}

const RootStack = createStackNavigator();

// this is a basic tab navigation design
function RootStackScreen(props) {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen name="User" component={UserScreenStack} {...props} />
      <RootStack.Screen
        name="Template"
        component={TemplateScreenStack}
        {...props}
      />
      <RootStack.Screen name="Todo" component={TodoScreenStack} {...props} />
      <RootStack.Screen
        name="ModalUser"
        component={UserScreenModal}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ModalTemplate"
        component={TemplateScreenModal}
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
function RootBottomTabScreen(props) {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Root"
        component={BottomTabNavigator}
        {...props} // options={{ headerShown: false }} or {...props}
      />
      <RootStack.Screen name="UserLink" component={UserScreen} {...props} />
      <RootStack.Screen
        name="ModalUser"
        component={UserScreenModal}
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

function BottomTabNavigationContainer(props) {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootBottomTabScreen // Left side of the app
        options={({ navigation, route }) => ({
          headerRight: (props) => <LogoTitle {...props} />,
          headerRightContainerStyle: {
            paddingRight: 16,
          },
        })}
      />
    </NavigationContainer>
  );
}

function DefaultNavigationContainer(props) {
  return (
    <NavigationContainer>
      <RootStackScreen // Right side of the app
        options={({ navigation, route }) => ({
          headerRight: (props) => <LogoTitle {...props} />,
          headerRightContainerStyle: {
            paddingRight: 16,
          },
        })}
      />
    </NavigationContainer>
  );
}

function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <BottomTabNavigationContainer />
        <DefaultNavigationContainer />
        {/**/}
      </View>
    );
  }
}

//export default withAuthenticator(App);
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
});
