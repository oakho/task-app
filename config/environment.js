/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'task',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    adapter: {
      type: 'socket',
      options: {
        useCSRF:              true,
        coalesceFindRequests: true
      }
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    // Uncomment this line when you want to use ember-data with a local Sails app
    // instead of provided websocket mocks
    // ENV.adapter.options.host = 'http://localhost:1337';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.adapter.options.host = 'http://wisembly-task-app.herokuapp.com';
  }

  return ENV;
};
