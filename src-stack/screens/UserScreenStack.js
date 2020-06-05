import React, { useReducer, useEffect } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";

import { API, graphqlOperation } from "aws-amplify";
//import { S3Image } from "aws-amplify-react-native";

import { listUsers } from "../../src/graphql/queries";
import { onCreateUser } from "../../src/graphql/subscriptions";

import { AwsUtils, ListUtils, Debug } from "../helpers";
import ProgressiveImage from "../components/ProgressiveImage";

const preview = require("../../assets/images/icon.png");

const initialState = {
  users: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.users };
    case "ADD_USER":
      return {
        ...state,
        users: ListUtils.addOrReplaceBy(
          // arr = [], predicate, getItem
          state.users,
          { owner: action.user.owner }, // owner unique key
          (elem) => ({
            // getItem
            ...elem,
            ...action.user,
          })
        ),
        //[action.user, ...state.users]
      };
    default:
      return state;
  }
}

export default function UserScreenStack({ navigation }) {
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
            title="Go to Product"
            onPress={() => navigation.navigate("Product")}
          />
        </View>
      ),
      headerRightContainerStyle: {
        paddingRight: 16,
      },
    });
  }, [navigation]);

  const [state, dispatch] = useReducer(reducer, initialState);

  async function fetchUsers() {
    try {
      let users = await API.graphql(graphqlOperation(listUsers));
      users = users.data.listUsers.items;

      Debug.reportUser(Debug.REPORT_SERIOUS, users);

      dispatch({ type: "SET_USERS", users });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUsers();
    console.log("line 87: " + state.users);

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
      uri = AwsUtils.downloadImage(
        avatarurl,
        AwsUtils.LEVEL_PROTECTED,
        AwsUtils.MIN_EXPIRES
      );
      console.log(uri);
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
