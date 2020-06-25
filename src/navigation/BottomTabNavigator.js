import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { View, Text, Button } from "react-native";

import TabBarIcon from "../components/TabBarIcon";
import { HomeScreen, LinksScreen, TemplateScreen } from "../screens";
import { Debug, Auth } from "../helpers";

import {
  withAuthenticator,
  SignOut,
  Authenticator,
} from "aws-amplify-react-native";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

const AlwaysOn = (props) => {
  return (
    <Authenticator hideDefault={true}>
      <View>
        <Text>sfaf</Text>
        {/* <Button
          title={Auth.username() | "Sign In"}
          onPress={() => props.onStateChange("signUp")}
        />*/}
      </View>
    </Authenticator>
  );
};

function getRightHeader(routeName) {
  switch (routeName) {
    case "Home":
      return (
        <View>
          {/*<AlwaysOn />*/}
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

function getHeaderTitle(routeName) {
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
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerTitle: getHeaderTitle(routeName),
    headerRight: (props) => getRightHeader(routeName),
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

//export default BottomTabNavigator;
export default withAuthenticator(BottomTabNavigator);
