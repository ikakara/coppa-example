import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";

import Amplify, { Analytics, Hub } from "aws-amplify";

import { LOG, Auth } from "../helpers";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // https://docs.amplify.aws/lib/utilities/logger/q/platform/js
  Amplify.Logger.LOG_LEVEL = "INFO";

  // https://aws-amplify.github.io/amplify-js/api/classes/analyticsclass.html#record
  Analytics.disable(); // Analytics.enable();

  // https://docs.amplify.aws/lib/utilities/hub/q/platform/js
  Hub.listen("auth", Auth.listener);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const credentials = await Auth.currentCredentials();
        LOG.info("useCachedResources Auth:", credentials);

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("../../assets/fonts/SpaceMono-Regular.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        LOG.warn("warn: ", e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
