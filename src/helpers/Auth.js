import { Auth, API, graphqlOperation } from "aws-amplify";
import { getUser } from "../../src/graphql/queries";

async function currentAuthenticatedUser() {
  const user = await Auth.currentAuthenticatedUser();
  return user;
}

async function username() {
  const user = await Auth.currentAuthenticatedUser();
  return user.username;
}

async function userInfo() {
  let user = undefined;

  try {
    const username = username();
    user = await API.graphql(
      graphqlOperation(getUser, { input: { username } })
    );
  } catch (err) {
    console.log("error: ", err);
  }

  return user;
}

export { currentAuthenticatedUser, username, userInfo };
