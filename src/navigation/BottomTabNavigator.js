import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { View, Image, StyleSheet, Platform, Text } from "react-native";

import TabBarIcon from "../components/TabBarIcon";
import { HomeScreen, LinksScreen, UserScreen } from "../screens";

import Amplify from "@aws-amplify/core";
import config from "../../aws-exports";
Amplify.configure(config);

import {
  withAuthenticator,
  AmplifyAuthenticator,
  AmplifySignOut,
} from "aws-amplify-react-native";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export function LogoTitle() {
  return (
    <View>
      <Text>custom stuff</Text>
    </View>
  );
}

function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerTitle: getHeaderTitle(route),
    headerRight: (props) => <LogoTitle {...props} />,
    headerRightContainerStyle: {
      paddingRight: 16,
    },
  });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Get Started",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-code-working" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Users"
        component={UserScreen}
        options={{
          title: "User",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" />
          ),
        }}
      />

      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: "Resources",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default withAuthenticator(BottomTabNavigator);

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "Home";
    case "Links":
      return "Links to learn more";
  }
}
