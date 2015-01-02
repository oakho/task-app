import Ember from 'ember';
import { initialize } from 'task/initializers/guid';

var container, application;

module('GuidInitializer', {
  setup: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  },
  teardown: function() {
    window.localStorage.removeItem('guid');
  }
});

// Replace this with your real tests.
test('it works', function() {
  initialize(container, application);

  // you would normally confirm the results of the initializer here
  ok(true);
});

test('generate a guid when none available in localStorage', function() {
  ok(!window.localStorage.getItem('guid'));
  initialize(container, application);
  ok(window.localStorage.getItem('guid'));
});

test('doesnt override an existing guid', function() {
  initialize(container, application);
  var guid = window.localStorage.getItem('guid');
  initialize(container, application);
  equal(guid, window.localStorage.getItem('guid'));
});
