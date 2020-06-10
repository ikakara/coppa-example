import * as React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import useCachedResources from "./src/hooks/useCachedResources";
import LinkingConfiguration from "./src/navigation/LinkingConfiguration";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import DefaultNavigator from "./src-default/navigation/DefaultNavigator";

import { RootNavigation } from "./src/navigation";
import {
  PublicScreen,
  UserScreen,
  TemplateScreen,
  TemplateModal,
  TodoModal,
  UserModal,
} from "./src/screens";

import { RightHeader } from "./src/components/RightHeader";

const RootStack = createStackNavigator();

// this is a bottom tab navigation design
function RootBottomTabScreen(props) {
  return (
    // BottomTabNavigator is wrapped w/ withAuthenticator

    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Root"
        component={BottomTabNavigator}
        {...props} // options={{ headerShown: false }} or {...props}
      />
      {/* Public Screens go below */}
      <RootStack.Screen name="Public" component={PublicScreen} {...props} />
      <RootStack.Screen name="Template" component={TemplateScreen} {...props} />
      {/* Modal Screens go below and each need to be wrapped withAuthenticator */}
      <RootStack.Screen
        name="ModalTemplate"
        component={TemplateModal}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ModalTodo"
        component={TodoModal}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ModalUser"
        component={UserModal}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}

// This is a component to make it easy to swap with DefaultNavigator
function BottomTabNavigationContainer(props) {
  return (
    <NavigationContainer
      ref={RootNavigation.navigationRef}
      linking={LinkingConfiguration}
    >
      <RootBottomTabScreen
        options={({ navigation, route }) => ({
          headerRight: (props) => <RightHeader {...props} />,
          headerRightContainerStyle: {
            paddingRight: 16,
          },
        })}
      />
    </NavigationContainer>
  );
}

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <BottomTabNavigationContainer {...props} />
        {/*<DefaultNavigator {...props} />*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
});
