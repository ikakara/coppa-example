import * as React from "react";
import { Button, View, Text } from "react-native";

import Amplify from "@aws-amplify/core";
import config from "../../aws-exports";
Amplify.configure(config);

import { withAuthenticator } from "aws-amplify-react-native";
import { Greetings } from "aws-amplify-react-native/dist/Auth";

function ProductScreenStack({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Button
            onPress={() => navigation.navigate("ModalProduct")}
            title="Add Product"
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
      <Text style={{ fontSize: 30 }}>This is the product screen!</Text>
      <Button
        onPress={() => navigation.navigate("ModalProduct")}
        title="Add Product"
        color="#00cc00"
      />
    </View>
  );
}

//export default ProductScreenStack;
export default withAuthenticator(ProductScreenStack, {includeGreetings: true,});
