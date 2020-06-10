//
// An abstraction layer for logging; can add pinpoint analytics here
//
// Global log level can be configured: Amplify.Logger.LOG_LEVEL = 'DEBUG';
// From the browser:                   window.LOG_LEVEL = 'DEBUG';
//

import { Logger } from "aws-amplify";

const LOG = new Logger("GlobalLogger", "VERBOSE");

function error(msg, data) {
  LOG.error(msg, data);
}

function warn(msg, data) {
  LOG.warn(msg, data);
}

function debug(msg, data) {
  LOG.debug(msg, data);
}

function info(msg, data) {
  LOG.info(msg, data);
}

export { error, warn, debug, info };
