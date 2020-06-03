import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet, TextInput, Image } from "react-native";

import { Storage, API, graphqlOperation } from "aws-amplify";
import uuid from "uuid/v4";
import { createUser, updateUser } from "../../src/graphql/mutations";

import { ImagePicker, Auth, AwsUtils } from "../helpers";

import config from "../../aws-exports";

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;

export default function UserScreenModal({ navigation, route }) {
  const [file, updateFile] = useState(undefined);
  const [username, updateUsername] = useState("");
  const [avatarUrl, updateAvatarUrl] = useState("");

  async function saveUser(event) {
    event.preventDefault();
    if (!username) return alert("please enter a username");
    if (file && username) {
      //const { name: fileName, type: mimeType } = file;
      let mimeType = ImagePicker.base64MimeType(file);
      let fileName = mimeType.replace("/", "."); // image/jpg ==> image.jpg

      console.log(
        "107 file " + (file && true) + " " + fileName + " " + mimeType
      );

      const key = `${uuid()}${fileName}`;
      const fileForUpload = {
        bucket,
        key,
        region,
      };

      let avatarData = Object.assign({
        media: fileForUpload,
        property: {},
      });

      let createOrUpdate = createUser; //or updateUser;
      let owner = Auth.username();
      const user = Auth.userInfo();
      if (user && user.owner) {
        console.log(user);
        createOrUpdate = updateUser;
      }

      const inputData = { owner, username, avatar: avatarData };

      console.log(inputData);

      try {
        await Storage.put(key, file, {
          contentType: mimeType,
        });
        await API.graphql(
          graphqlOperation(createOrUpdate, { input: inputData })
        );
        //updateUsername("");
        console.log("successfully stored user data!");
      } catch (err) {
        console.log("error: ", err);
      }

      navigation.goBack();
    }
  }

  async function pickImage() {
    let result = await ImagePicker.pickImage();
    if (result) {
      updateFile(result);
    }
  }

  useEffect(() => {
    const user = Auth.userInfo();
    if (user) {
      updateUsername(user.username);
      if (user.avatar && user.avatar.media && user.avatar.media.key) {
        let imageData = AwsUtils.fetchImage(user.avatar.media.key);
        updateAvatarUrl(imageData);
      }
    }
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>Update User Info</Text>
      <View style={{ flexDirection: "row" }}>
        {file && (
          <Image source={{ uri: file }} style={{ width: 200, height: 200 }} />
        )}
        <Button onPress={pickImage} title="Select Avatar" />
      </View>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChange={(e) => updateUsername(e.target.value)}
      />
      <Image source={avatarUrl} style={{ width: 300 }} />
      <View style={{ flexDirection: "row" }}>
        <Button onPress={saveUser} title="Update Info" color="#00cc00" />
        <Button onPress={() => navigation.goBack()} title="Dismiss" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  username: {
    fontSize: 24,
  },
  avatarurl: {
    fontSize: 12,
  },
  user: { marginBottom: 15 },
  input: { height: 50, backgroundColor: "#ddd", marginBottom: 10, padding: 8 },
});
