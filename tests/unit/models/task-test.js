import {
  moduleForModel,
  test
} from 'ember-qunit';

import Ember from 'ember';

moduleForModel('task', 'Task', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});

test('isLocker', function() {
  var task = this.subject({ locker: '12345' });

  ok(task.isLocker('12345'), 'task is locked by 12345');
  ok(!task.isLocker('54321'), 'task is not locked by 54321');
});

test('lock method', function() {
  var task = this.subject();

  Ember.run(function() {
    task.lock('12345');
  });

  equal(task.get('locker'), '12345', 'task is locked by 12345');
});

test('unlock method', function() {
  var task = this.subject({ locker: '12345' });

  Ember.run(function() {
    task.unlock();
  });

  equal(task.get('locker'), null, 'task is unlocked');
});
