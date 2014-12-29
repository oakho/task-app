import config from "../config/environment";

export function initialize(/* container, application */) {
  io.sails.url = config.adapter.options.host;
  io.sails.autoConnect = true;
}

export default {
  name: 'socket',
  before: 'store',
  initialize: initialize
};
