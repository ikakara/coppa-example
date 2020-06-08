import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImageUtils from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { Debug } from "../helpers";

//
// from: https://github.com/expo/image-upload-example/blob/master/frontend/App.js#L109
//
function uriFormData(uri) {
  // this is meant to parse a filename
  let formData = new FormData();

  if (uri) {
    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];

    formData.append("photo", {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
  }

  console.log(formData);

  return formData;
}

// https://miguelmota.com/bytes/base64-mime-regex/
function base64MimeType(encoded) {
  var result = null;

  if (typeof encoded !== "string") {
    return result;
  }

  var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  if (mime && mime.length) {
    result = mime[1];
  }

  return result;
}

async function pickImage() {
  // below is broken for web
  if (Constants.platform.ios) {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (cameraRollPerm !== "granted") {
      Debug.serious(
        "Sorry Charlie: ",
        "We need camera roll permissions to make this work!"
      );
    }
  }

  let pickerResult = await ImageUtils.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
    base64: false,
    exif: true,
  });

  if (pickerResult && !pickerResult.cancelled) {
    //let formData = uriFormData(pickerResult.uri);
    console.log(pickerResult);
    return pickerResult.uri;
  }

  return undefined;
}

async function takePhoto() {
  // below is broken for web
  if (Constants.platform.ios) {
    const { status: cameraPerm } = await Permissions.askAsync(
      Permissions.CAMERA
    );
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (cameraRollPerm !== "granted" || cameraPerm !== granted) {
      Debug.serious(
        "Sorry Charlie: ",
        "We need camera and camera roll permissions to make this work!"
      );
    }
  }

  let pickerResult = await ImageUtils.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    base64: false,
    exif: true,
  });

  if (pickerResult && !pickerResult.cancelled) {
    //let formData = uriFormData(pickerResult.uri);
    console.log(pickerResult);
    return pickerResult.uri;
  }

  return undefined;
}

async function resizeImage(uri, width) {
  const resized = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width } }],
    { compress: 0.1, format: ImageManipulator.SaveFormat.JPEG, base64: true }
  );

  // return destructured object
  //return {uri: resized.uri, width: resized.width, height: resized.height};
  return resized;
}

export { uriFormData, base64MimeType, pickImage, takePhoto, resizeImage };
