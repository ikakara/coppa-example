import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { View, Text } from "react-native";

import TabBarIcon from "../components/TabBarIcon";
import { HomeScreen, LinksScreen, TemplateScreen } from "../screens";
import { Debug } from "../helpers"

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

function getRightHeader(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return (
        <View>
          <Text>Home</Text>
        </View>
      );
    case "Template":
      return (
        <View>
          <Text>Template</Text>
        </View>
      );
    case "Links":
      return (
        <View>
          <Text>Links</Text>
        </View>
      );
  }
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "Home";
    case "Template":
      return "Template";
    case "Links":
      return "Update User";
  }
}

function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerTitle: getHeaderTitle(route),
    headerRight: (props) => getRightHeader(route),
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
          title: "Todos",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-code-working" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Template"
        component={TemplateScreen}
        options={{
          title: "Template",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" />
          ),
        }}
      />

      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: "User Info",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default withAuthenticator(BottomTabNavigator);
