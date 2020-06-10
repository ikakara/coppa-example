import * as React from "react";
import { Button, View, Text } from "react-native";

import Amplify from "@aws-amplify/core";
import config from "../../aws-exports";
Amplify.configure(config);

import { withAuthenticator } from "aws-amplify-react-native";

function TemplateScreenStack({ navigation }) {
  React.useLayoutEffect(() => {
    navigation?.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Button
            onPress={() => navigation.navigate("ModalTemplate")}
            title="Do Modal Template"
            color="#00cc00"
          />
          <Button
            title="Go to Todo"
            onPress={() => navigation.navigate("Todo")}
          />
        </View>
      ),
      headerRightContainerStyle: {
        paddingRight: 16,
      },
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>This is the template screen!</Text>
      <Button
        onPress={() => navigation.navigate("ModalTemplate")}
        title="Do Modal Template"
        color="#00cc00"
      />
    </View>
  );
}

export default withAuthenticator(TemplateScreenStack);
