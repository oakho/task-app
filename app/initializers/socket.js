import config from "../config/environment";

/* globals io */

export function initialize(/* container, application */) {
  var options = config.adapter.options;

  io.sails.url         = options.host;
  io.transports        = options.transports || io.transports;
}

export default {
  name: 'socket',
  before: 'store',
  initialize: initialize
};
