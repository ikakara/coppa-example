import { Storage } from "aws-amplify";

import { LOG } from "../helpers";

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
      level = LEVEL_PRIVATE;
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

async function presignedUriForDownload(key, level, expires) {
  level = validateLevel(level);
  expires = validateExpires(expires);

  let presignedUri = undefined;
  try {
    presignedUri = await Storage.get(key, {
      level: level,
      expires: expires,
      track: true, // tracked by pinpoint
    });
  } catch (err) {
    LOG.error("error: ", err);
  }
  return presignedUri;
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
      track: true, // tracked by pinpoint
      //ContentEncoding : "base64",
      progressCallback(progress) {
        LOG.info("Progress: ", `Uploaded: ${progress.loaded}/${progress.total}`);
      },
    });

    return true;
  } catch (err) {
    LOG.error("error: ", err);
  }
  return false;
}

export {
  presignedUriForDownload,
  uploadImage,
  validateLevel,
  LEVEL_PRIVATE,
  LEVEL_PROTECTED,
  LEVEL_PUBLIC,
  validateExpires,
  MIN_EXPIRES,
  MAX_EXPIRES,
};
