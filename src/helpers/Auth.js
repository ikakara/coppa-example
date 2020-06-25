import {
  API,
  Auth,
  Analytics,
  graphqlOperation,
} from "aws-amplify";

import { getUser } from "../../src/graphql/queries";
import { LOG } from "../helpers";

const blankState = {
  eventSignedIn: 0,
  eventSignedOut: 0,
  signedIn: false,
  username: undefined,
  user: undefined,
  credentials: undefined,
};

let authGlobal = blankState; // initialize authGlobal

function setAuthGlobal(authState) {
  authGlobal = authState;
}

function setState(key, value) {
  setAuthGlobal({ ...authGlobal, [key]: value });
  LOG.info("authGlobal:", authGlobal);
}

// returns credentials if unauthorized state
// returns undefined if authorized
// returns false if there was a problem
async function currentCredentials() {
  if (authGlobal.credentials == undefined) {
    // request credentials
    await Auth.currentCredentials()
      .then((d) => {
        setState("credentials", d);
      })
      .catch((e) => {
        LOG.error("error: ", e);
        throw e;
      });
  }

  return authGlobal.credentials;
}

async function currentAuthenticatedUser() {
  if (authGlobal.user == undefined) {
    await Auth.currentAuthenticatedUser()
      .then((d) => {
        LOG.info("data: ", d);
        setState("user", d);
      })
      .catch((e) => {
        LOG.error("error: ", e);
        throw e;
      });
  }

  return authGlobal.user;
}

function signedIn() {
  return authGlobal.signedIn;
}

async function username() {
  return authGlobal.username;
}

// this state isn't currently listened for, so must make a new request
async function userInfo() {
  const _username = username();

  if (_username == undefined) {
    return undefined;
  }

  await API.graphql(graphqlOperation(getUser, { input: { _username } }))
    .then((info) => {
      return info;
    })
    .catch((e) => {
      LOG.error("error: ", e);
      return false;
    });
}

const listener = (data) => {
  switch (data.payload.event) {
    case "signIn":
      if (authGlobal.signedIn) {
        // getting signIn events when already signedIn
        setState(authGlobal.eventSignedIn + 1);
        break;
      }

      Analytics.startSession();
      setAuthGlobal(blankState);
      setState("signedIn", true);
      setState("username", data.payload.data.username);

      LOG.info(
        `events(SignedOut):${authGlobal.eventSignedOut} - `,
        data.payload
      );
      break;
    case "signUp":
      LOG.error("user signed up", data.payload);
      break;
    case "signOut":
      if (!authGlobal.signedIn) {
        // getting signOut events when already signedOut
        setState(authGlobal.eventSignedOut + 1);
        break;
      }

      Analytics.stopSession();
      setAuthGlobal(blankState);
      setState("signedIn", false);

      LOG.info(`events(SignedIn):${authGlobal.eventSignedIn} - `, data.payload);
      break;
    case "signIn_failure":
      LOG.error("user sign in failed", data.payload);
      break;
    case "configured":
      LOG.error("the Auth module is configured", data.payload);
      break;
    default:
      LOG.error("unknown auth event]", data.payload);
  }
};

export {
  currentCredentials,
  currentAuthenticatedUser,
  username,
  userInfo,
  listener,
  signedIn,
};
