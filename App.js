import * as React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import useCachedResources from "./src/hooks/useCachedResources";
import LinkingConfiguration from "./src/navigation/LinkingConfiguration";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import DefaultNavigator from "./src-default/navigation/DefaultNavigator";

import { HomeScreen, TemplateScreen } from "./src/screens";
import {
  UserScreenModal,
  TemplateScreenModal,
  TodoScreenModal,
} from "./src-default/screens";

import { RightHeader } from "./src/components/RightHeader";

const RootStack = createStackNavigator();

function PublicScreens(props) {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen name="Home" component={HomeScreen} {...props} />
      <RootStack.Screen name="Template" component={TemplateScreen} {...props} />
    </RootStack.Navigator>
  );
}

// this is a bottom tab navigation design
function RootBottomTabScreen(props) {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Private"
        component={BottomTabNavigator}
        {...props} // options={{ headerShown: false }} or {...props}
      />
      <RootStack.Screen
        name="Public"
        component={PublicScreens}
        {...props} // options={{ headerShown: false }} or {...props}
      />
      {/* Modal Screens go below */}
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
      <RootStack.Screen
        name="ModalTemplate"
        component={TemplateScreenModal}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}

// This is a component to make it easy to swap with DefaultNavigator
function BottomTabNavigationContainer(props) {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
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
        {/*<BottomTabNavigationContainer {...props} />*/}
        <DefaultNavigator {...props} />
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
