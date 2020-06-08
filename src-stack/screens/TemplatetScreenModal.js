import * as React from "react";
import { Button, View, Text } from "react-native";

import { withAuthenticator } from "aws-amplify-react-native";

function TemplateScreenModal({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>This is a template modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

export default withAuthenticator(TemplateScreenModal);
