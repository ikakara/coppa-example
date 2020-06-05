import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet, TextInput, Image } from "react-native";

import uuid from "uuid/v4";
import { API, graphqlOperation } from "aws-amplify";
import { createUser, updateUser } from "../../src/graphql/mutations";

import { ImageUtils, Auth, AwsUtils } from "../helpers";
import config from "../../aws-exports";

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;

export default function UserScreenModal({ navigation, route }) {
  const [file, updateFile] = useState(undefined);
  const [fileProperties, updateProperties] = useState(undefined);
  const [displayName, updateDisplayName] = useState("");
  const [avatarUrl, updateAvatarUrl] = useState("");

  async function saveUser(event) {
    event.preventDefault();
    if (!displayName) return alert("please enter a disaplay name");

    if (file && displayName) {
      //const { name: fileName, type: mimeType } = file;
      let mimeType = ImageUtils.base64MimeType(file);
      let fileName = mimeType.replace("/", "."); // image/jpg ==> image.jpg

      console.log(
        "107 file " + fileName + " " + mimeType + " " + fileProperties
      );

      const key = `${uuid()}${fileName}`;
      const fileForUpload = {
        bucket,
        key,
        region,
      };

      let avatarData = Object.assign({
        media: fileForUpload,
        property: fileProperties,
      });

      let createOrUpdate = createUser; //or updateUser;
      let owner = Auth.username();
      const user = Auth.userInfo();
      if (user && user.owner) {
        console.log(user);
        createOrUpdate = updateUser;
      }

      const inputData = { owner, displayName, avatar: avatarData };

      console.log("line 56: " + owner + " " + displayName);

      try {
        await AwsUtils.uploadImage(
          key,
          file,
          mimeType,
          AwsUtils.LEVEL_PROTECTED
        );

        await API.graphql(
          graphqlOperation(createOrUpdate, { input: inputData })
        );
        //updateDisplayName("");
        console.log("successfully stored user data!");
      } catch (err) {
        console.log("error: ", err);
        //alert(err.errors);
      }

      navigation.goBack();
    }
  }

  async function pickImage() {
    let result = await ImageUtils.pickImage();
    if (result) {
      // lets compress the iamge
      const { uri, width, height } = await ImageUtils.resizeImage(
        result,
        100 /* width */
      );

      console.log("line 90: " + width + " " + height + " " + uri);
      updateFile(uri);
      updateProperties({ width, height });
    }
  }

  useEffect(() => {
    const user = Auth.userInfo();
    if (user) {
      updateDisplayName(user.displayName);
      if (user.avatar && user.avatar.media && user.avatar.media.key) {
        let imageData = AwsUtils.downloadImage(user.avatar.media.key);
        updateAvatarUrl(imageData);
      }
    }
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>Update User Info</Text>
      <View style={{ flexDirection: "row" }}>
        {file && (
          <Image
            source={{ uri: file }}
            resizeMode="contain"
            style={{ width: 200, height: 200 }}
          />
        )}
        <Button onPress={pickImage} title="Select Avatar" />
      </View>
      <TextInput
        placeholder="Display Name"
        style={styles.input}
        value={displayName || ""}
        onChange={(e) => updateDisplayName(e.target.value)}
      />
      <Image source={avatarUrl} style={{ width: 300 }} />
      <View style={{ flexDirection: "row" }}>
        <Button onPress={saveUser} title="Save" color="#00cc00" />
        <Button onPress={() => navigation.goBack()} title="Dismiss" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  displayName: {
    fontSize: 24,
  },
  avatarurl: {
    fontSize: 12,
  },
  user: { marginBottom: 15 },
  input: { height: 50, backgroundColor: "#ddd", marginBottom: 10, padding: 8 },
});
