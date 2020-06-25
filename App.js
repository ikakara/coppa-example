import React from "react";
import { View, Platform } from "react-native";

/**
- DrawerNavigator
  - Welcome Stack
    - Welcome Screen
      - Login Button
    - Sign Up Screen
  - Dashboard - StackNavigator (needed for header and to change the header based on the tab)
    - TabNavigator (Dashboard)
      - Tab 1 - Feed - StackNavigator
        - Feed Screen
        - Details Screen
      - Tab 2 - Profile - StackNavigator
        - Profile Screen
      - Tab 3 - Settings - StackNavigator
        - Settings Screen
    - Modal Screen
 */

import { NavigationContainer } from "@react-navigation/native";

import useCachedResources from "./src/hooks/useCachedResources";

import {
  DrawerNavigator,
  RootNavigation,
  LinkingConfiguration,
} from "./src/navigation";

import { styles } from "./src/screens";

import Amplify from "@aws-amplify/core";
import config from "./aws-exports";
Amplify.configure(config);

function App(props) {
  const { navigation, route } = props;
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <NavigationContainer
          ref={RootNavigation.navigationRef}
          linking={LinkingConfiguration}
        >
          <DrawerNavigator drawerPosition="right" {...props} />
        </NavigationContainer>
      </View>
    );
  }
}

export default App;
