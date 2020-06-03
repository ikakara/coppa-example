import { Storage } from "aws-amplify";

async function fetchImage(key) {
  let imageData = undefined;
  try {
    imageData = await Storage.get(key);
  } catch (err) {
    console.log("error: ", err);
  }
  return imageData;
}

export { fetchImage };