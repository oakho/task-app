import {
  moduleFor,
  test
} from 'ember-qunit';

import mockTask from '../../helpers/mock-task';
import Task from 'task/models/task';

moduleFor('controller:index', 'IndexController', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// Replace this with your real tests.
test('it exists', function() {
  var controller = this.subject();
  ok(controller);
});

test('filteredContent only returns saved task', function() {
  expect(3);

  var savedTask   = mockTask({ isNew: false });
  var unsavedTask = mockTask({ isNew: true });
  var controller  = this.subject({ model: [savedTask, unsavedTask] });

  equal(controller.get('filteredContent.length'), 1);
  ok(controller.get('filteredContent').contains(savedTask));
  ok(!controller.get('filteredContent').contains(unsavedTask));
});

test('filteredContent returns only private task that belongs to guid or that are locked by guid', function() {
  expect(5);

  var publicTask         = mockTask();
  var ownPrivateTask     = mockTask({
    isPublic: false,
    isPrivate: true,
    isOwner: function() { return true; }
  });
  var lockedPrivateTask  = mockTask({
    isPublic: false,
    isPrivate: true,
    isLocker: function() { return true; }
  });
  var foreignPrivateTask = mockTask({ isPublic: false, isPrivate: true });

  var controller         = this.subject({
    model: [publicTask, ownPrivateTask, lockedPrivateTask, foreignPrivateTask],
    guid: '12345'
  });

  equal(controller.get('filteredContent.length'), 3);
  ok(controller.get('filteredContent').contains(publicTask));
  ok(controller.get('filteredContent').contains(lockedPrivateTask));
  ok(controller.get('filteredContent').contains(ownPrivateTask));
  ok(!controller.get('filteredContent').contains(foreignPrivateTask));
});
