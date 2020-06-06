// these functions are pass by reference
function serious(msg, promise) {
  if (promise instanceof Promise) {
    promise.then((val) => alert(msg + val));
  } else {
    alert(msg + promise);
  }
}

// these functions are pass by reference
function error(msg, promise) {
  if (promise instanceof Promise) {
    promise.then((val) => console.error(msg + val));
  } else {
    console.error(msg + promise);
  }
}

// these functions are pass by reference
function warn(msg, promise) {
  if (promise instanceof Promise) {
    promise.then((val) => console.warn(msg + val));
  } else {
    console.warn(msg + promise);
  }
}

// these functions are pass by reference
function log(msg, promise) {
  if (promise instanceof Promise) {
    promise.then((val) => console.log(msg + val));
  } else {
    console.log(msg + promise);
  }
}

// these functions are pass by reference
function debug(msg, promise) {
  if (promise instanceof Promise) {
    promise.then((val) => console.debug(msg + val));
  } else {
    console.debug(msg + promise);
  }
}

const REPORT_SERIOUS = "serious";
const REPORT_ERROR = "error";
const REPORT_WARN = "warn";
const REPORT_INFO = "info";
const REPORT_DEBUG = "debug";

function report(type, msg, item) {
  switch (type) {
    case REPORT_SERIOUS:
      serious(msg, item);
      break;
    case REPORT_ERROR:
      error(msg, item);
      break;
    case REPORT_WARN:
      warn(msg, item);
      break;
    case REPORT_INFO:
      info(msg, item);
      break;
    case REPORT_DEBUG:
      debug(msg, item);
      break;
    default:
      alert(`FOUND MISCONFIGURED REPORTING TYPE: ${type} FOR ${msg}${item}`);
  }
}

// return true (for good); false (for bad)
function reportMedia(type, _media) {
  const CONFIG_WARNING = `WARNING: .graphqlconfig.yml (codegen depth) is probably misconfigured `;

  const { media, property } = _media || {
    media: undefined,
    property: undefined,
  };

  if (media == undefined || property == undefined) {
    report(
      type,
      `reportMedia found undefined media:${media} property:${property} ${CONFIG_WARNING}`,
      _media
    );
    return false;
  }

  const { width, height } = property || {
    width: undefined,
    height: undefined,
  };

  if (width == undefined || height == undefined) {
    report(
      type,
      `reportMedia found undefined width:${width} height:${height} ${CONFIG_WARNING}`,
      _media
    );
    return false;
  }

  return true;
}

// return true (for good); false (for bad)
function reportUser(type, array) {
  if (array == undefined) {
    report(type, "reportUser found undefined ", array);
    return false;
  }

  let user = undefined;

  if (array instanceof Array) {
    // randomly select a user from array
    user = array[(array.length * Math.random()) | 0];
  } else {
    user = array; // not an array, assume a user
  }

  // let's start decontruction user to see if any data is missing
  const { owner, displayName, avatar } = user;
  if (owner == undefined || displayName == undefined || avatar == undefined) {
    report(
      type,
      `reportUser found undefined ${owner} ${displayName} ${avatar}`,
      user
    );
    return false;
  }

  return reportMedia(type, avatar);
}

// return true (for good); false (for bad)
function reportTodo(type, array) {
  if (array == undefined) {
    report(type, "reportTodo found undefined ", array);
    return false;
  }

  let todo = undefined;

  if (array instanceof Array) {
    // randomly select a user from array
    todo = array[(array.length * Math.random()) | 0];
  } else {
    todo = array; // not an array, assume a user
  }

  // let's start decontruction todo to see if any data is missing
  const { owner, visibility, name, description } = todo;
  if (
    owner == undefined ||
    visibility == undefined ||
    name == undefined ||
    description == undefined
  ) {
    report(
      type,
      `reportTodo found undefined ${owner} ${visibility} ${name} ${description}`,
      todo
    );
    return false;
  }

  return false;
}

export {
  serious,
  error,
  warn,
  log,
  debug,
  REPORT_SERIOUS,
  REPORT_ERROR,
  REPORT_WARN,
  REPORT_INFO,
  REPORT_DEBUG,
  reportUser,
  reportTodo,
  reportMedia,
};
