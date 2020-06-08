import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LinkingConfiguration from "./LinkingConfiguration";
import { RightHeader } from "../components/RightHeader";

import {
  UserScreenStack,
  UserScreenModal,
  TemplateScreenStack,
  TemplateScreenModal,
  TodoScreenStack,
  TodoScreenModal,
} from "../../src-stack/screens";

const DefaultStack = createStackNavigator();

// this is a basic tab navigation design
function DefaultStackScreen(props) {
  return (
    <DefaultStack.Navigator mode="modal">
      <DefaultStack.Screen name="User" component={UserScreenStack} {...props} />
      <DefaultStack.Screen
        name="Template"
        component={TemplateScreenStack}
        {...props}
      />
      <DefaultStack.Screen name="Todo" component={TodoScreenStack} {...props} />
      <DefaultStack.Screen
        name="ModalUser"
        component={UserScreenModal}
        options={{ headerShown: false }}
      />
      <DefaultStack.Screen
        name="ModalTemplate"
        component={TemplateScreenModal}
        options={{ headerShown: false }}
      />
      <DefaultStack.Screen
        name="ModalTodo"
        component={TodoScreenModal}
        options={{ headerShown: false }}
      />
    </DefaultStack.Navigator>
  );
}

export default function DefaultNavigator(props) {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <DefaultStackScreen
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
