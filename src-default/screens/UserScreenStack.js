import React, { useReducer, useEffect } from "react";
import { Button, View, Text, StyleSheet, FlatList } from "react-native";

import { ScrollView } from "react-native-gesture-handler";

import { API, graphqlOperation } from "aws-amplify";
//import { S3Image } from "aws-amplify-react-native";

import { listUsers } from "../../src/graphql/queries";
import { onCreateUser } from "../../src/graphql/subscriptions";

import { AwsUtils, Reducer, Debug, LOG } from "../../src/helpers";
import ProgressiveImage from "../../src/components/ProgressiveImage";

import { withAuthenticator } from "aws-amplify-react-native";

const preview = require("../../assets/images/icon.png");

const initialState = {
  users: [],
};

function UserScreenStack({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Button
            onPress={() => navigation.navigate("ModalUser")}
            title="Update User"
            color="#00cc00"
          />
          <Button
            title="Go to Template"
            onPress={() => navigation.navigate("Template")}
          />
        </View>
      ),
      headerRightContainerStyle: {
        paddingRight: 16,
      },
    });
  }, [navigation]);

  const [state, dispatch] = useReducer(Reducer.forUsers, initialState);

  async function fetchUsers() {
    try {
      let users = await API.graphql(graphqlOperation(listUsers));
      users = users.data.listUsers.items;

      Debug.reportUser(Debug.REPORT_SERIOUS, users);

      dispatch({ type: "SET_USERS", users });
    } catch (err) {
      LOG.error("error: ", err);
    }
  }

  useEffect(() => {
    fetchUsers();

    const subscription = API.graphql(graphqlOperation(onCreateUser)).subscribe({
      next: async (userData) => {
        const { onCreateUser } = userData.value.data;
        dispatch({ type: "ADD_USER", user: onCreateUser });
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  function Item({ displayName, avatarurl }) {
    let uri = undefined;
    if (avatarurl) {
      uri = AwsUtils.presignedUriForDownload(
        avatarurl,
        AwsUtils.LEVEL_PROTECTED,
        AwsUtils.MIN_EXPIRES
      );
      LOG.info("Item:", uri);
    }

    return (
      <View style={styles.item}>
        {uri != undefined && (
          <ProgressiveImage
            {...{ preview, uri }}
            style={{ width: 50, height: 50 }}
          />
        )}
        <Text style={styles.displayName}>{displayName}</Text>
        <Text style={styles.avatarurl}>{avatarurl}</Text>
      </View>
    );

    /*
    return (
      <View style={styles.item}>
        <S3Image
          imgkey={avatarurl}
          level="private"
          resizeMode="contain"
          style={{ width: 200, height: 200 }}
        />
        <Text style={styles.displayName}>{displayName}</Text>
        <Text style={styles.avatarurl}>{avatarurl}</Text>
      </View>
    ); */
  }

  if (state.users.length > 0) {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <FlatList
            data={state.users}
            renderItem={({ item }) => (
              <Item
                displayName={item.displayName}
                avatarurl={item.avatar && item.avatar.media.key}
              />
            )}
            keyExtractor={(item) => item.owner}
          />
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 30 }}>This is the user screen!</Text>
        <Button
          onPress={() => navigation.navigate("ModalUser")}
          title="Update User"
          color="#00cc00"
        />
      </View>
    );
  }
}

export default withAuthenticator(UserScreenStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingTop: 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 1,
  },
  displayName: {
    fontSize: 24,
  },
  avatarurl: {
    fontSize: 12,
  },
  user: { marginBottom: 15 },
  input: { height: 50, backgroundColor: "#ddd", marginBottom: 10, padding: 8 },
});
