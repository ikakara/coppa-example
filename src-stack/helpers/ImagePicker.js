import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

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
  //console.log(mime);
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
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
    base64: false,
    exif: true,
  });

  if (pickerResult && !pickerResult.cancelled) {
    //console.log(pickerResult);
    let formData = uriFormData(pickerResult.uri);
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
      alert(
        "Sorry, we need camera and camera roll permissions to make this work!"
      );
    }
  }

  let pickerResult = await ImagePicker.launchCameraAsync({
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

export { uriFormData, base64MimeType, pickImage, takePhoto };
