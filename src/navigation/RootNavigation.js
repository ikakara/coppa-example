//
// https://stackoverflow.com/questions/60087807/how-to-use-usenavigation-within-react-navigation-drawer
//
import { createRef } from "react";

const navigationRef = createRef();

function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}

// no such thing
function setOptions(obj, array) {
  navigationRef.current?.setOptions(obj, array);
}

export { navigationRef, navigate, goBack, setOptions };
