import * as React from "react";
import { View, Image, Text } from "react-native";

//{this.state.authState.isLoggedIn ? 'User is Logged In' : 'Not Logged In'}

function RightHeader(props) {
  return (
    <View>
      <Text>Right Header - remove me</Text>
      <Image
        style={{ width: 50, height: 50 }}
        source={
          __DEV__
            ? require("../../assets/images/robot-dev.png")
            : require("../../assets/images/robot-prod.png")
        }
      />
    </View>
  );
}

export { RightHeader };
