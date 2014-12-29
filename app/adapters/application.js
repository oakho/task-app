import SailsSocketAdapter from 'ember-data-sails/adapters/sails-socket';
import config from "../config/environment";

export default SailsSocketAdapter.extend(config.adapter.options);
