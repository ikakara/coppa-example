import { Storage } from "aws-amplify";

const LEVEL_PRIVATE = "private";
const LEVEL_PROTECTED = "protected";
const LEVEL_PUBLIC = "public";

function validateLevel(level) {
  switch (level) {
    case LEVEL_PRIVATE: // only accessible by owner
    case LEVEL_PROTECTED: // editable by owner, readable by app users
    case LEVEL_PUBLIC: // accessible to app users
      break;
    default:
      level = "private";
  }
  return level;
}

const MIN_EXPIRES = 60; // 1 minute
const MAX_EXPIRES = 600; // 10 miinutes

function validateExpires(expires) {
  if (expires < MIN_EXPIRES) {
    expires = MIN_EXPIRES;
  } else if (expires > MAX_EXPIRES) {
    expires = MAX_EXPIRES;
  }
  return expires;
}

async function downloadImage(key, level, expires) {
  level = validateLevel(level);
  expires = validateExpires(expires);

  let imageData = undefined;
  try {
    imageData = await Storage.get(key, {
      level: level,
      expires: expires,
      track: true, // tracked by pinpint
    });
  } catch (err) {
    console.log("error: ", err);
  }
  return imageData;
}

async function uploadImage(key, file, mimeType, level) {
  level = validateLevel(level);
  try {
    const response = await fetch(file);
    const blob = await response.blob();

    await Storage.put(key, blob, {
      serverSideEncryption: "AES256",
      level: level,
      contentType: mimeType,
      track: true, // tracked by pinpint
      //ContentEncoding : "base64",
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      },
    });

    return true;
  } catch (err) {
    console.log("error: ", err);
  }
  return false;
}

export {
  downloadImage,
  uploadImage,
  validateLevel,
  LEVEL_PRIVATE,
  LEVEL_PROTECTED,
  LEVEL_PUBLIC,
  validateExpires,
  MIN_EXPIRES,
  MAX_EXPIRES,
};
