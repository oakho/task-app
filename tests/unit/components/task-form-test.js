import {
  moduleForComponent,
  test
} from 'ember-qunit';

import Ember from 'ember';
import mockTask from '../../helpers/mock-task';

moduleForComponent('task-form', 'TaskFormComponent', {
  // specify the other units that are required for this test
  needs: [
    'component:task-date',
    'template:components/task-date',
    'component:task-done',
    'template:components/task-done'
  ]
});

test('it renders', function() {
  expect(3);

  var task      = mockTask();

  // creates the component instance
  var component = this.subject({ content: task });
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');

  ok(component.$().hasClass('task-form'));
});

test('tasks label property is bound to textarea', function() {
  var task      = mockTask();
  var component = this.subject({ content: task });

  Ember.run(function() {
    task.set('label', 'TotoBolo');
  });

  equal(this.$().find('.task-label-textarea').val(), 'TotoBolo');
});

test('tasks private property is bound to checkbox when editing', function() {
  var task      = mockTask();
  var component = this.subject({ content: task, isEditing: true });

  Ember.run(function() {
    task.set('private', true);
  });

  equal(this.$().find('.task-private-input').prop('checked'), true);
});

test('privateInputId properly defined', function() {
  var task      = mockTask();
  var component = this.subject({ content: task });

  equal(component.get('privateInputId'), 'task-private-input-'+ task.get('id'));
});

test('handles label max length', function() {
  expect(2);

  var task      = mockTask();
  var component = this.subject({ content: task });

  equal(component.get('remainingCharacters'), 140);
  task.set('label', 'TotoBolo');
  equal(component.get('remainingCharacters'), 132);
});

test('displays remaining label chararacters when editing', function() {
  expect(3);

  var task                 = mockTask();
  var component            = this.subject({ content: task, isEditing: true });
  var $remainingCharacters = this.$().find('.task-remaining_characters');

  ok(!!$remainingCharacters);
  equal($.trim($remainingCharacters.text()), '140');

  Ember.run(function() {
    task.set('label', 'TotoBolo');
  });

  equal($.trim($remainingCharacters.text()), '132');
});

test('has a cancel button when editing', function() {
  var task      = mockTask();
  var component = this.subject({ content: task, isEditing: true });

  equal(this.$().find('.task-cancel-button').length, 1);
});

test('has a save button editing', function() {
  var task      = mockTask();
  var component = this.subject({ content: task, isEditing: true });

  equal(this.$().find('.task-save-button').length, 1);
});

test('submit task and send action on textarea enter keypress', function() {
  expect(2);

  var task         = mockTask();
  var targetObject = Ember.Object.create({
    didUpdateTask: function(updatedTask) {
      ok(true, 'Did send action');
      equal(updatedTask, task, 'Updated task is passed as action param');
    }
  });
  var component    = this.subject({
    content: task,
    submit: 'didUpdateTask',
    targetObject: targetObject
  });

  this.$().find('.task-label-textarea').trigger(Ember.$.Event('keypress', { keyCode: 13 }));
});

test('rollback task and send cancel action on esc keyup', function() {
  expect(2);

  var task         = mockTask();
  var targetObject = Ember.Object.create({
    didCancelTaskUpdate: function(cancelledTask) {
      ok(true, 'Did send cancel action');
      equal(cancelledTask, task, 'Updated task is passed as action param');
    }
  });
  var component    = this.subject({
    content: task,
    cancel: 'didCancelTaskUpdate',
    targetObject: targetObject
  });

  this.append();

  component.trigger('keyUp', { keyCode: 27 });
});

test('sending editStart action should set isEditing to true', function() {
  var task = mockTask({ label: 'TotoBolo' });
  var component = this.subject({
    content: task
  });

  component.send('editStart');
  equal(component.get('isEditing'), true);
});

test('sending editEnd action should set isEditing to true', function() {
  var task = mockTask({ label: 'TotoBolo' });
  var component = this.subject({
    isEditing: true,
    content: task
  });

  component.send('editEnd');
  equal(component.get('isEditing'), false);
});

test('has editing class while editing', function() {
  var task = mockTask();
  var component = this.subject({ content: task, isEditing: true });

  ok(this.$().hasClass('task-editing'));
});

test('has done class when task is done', function() {
  var task = mockTask({ isDone: true });
  var component = this.subject({ content: task });

  ok(this.$().hasClass('task-done'));
});

test('has error class when task is error', function() {
  var task = mockTask({ isError: true });
  var component = this.subject({ content: task });

  ok(this.$().hasClass('task-error'));
});

test('it displays created/updated date using task-date component', function() {
  expect(2);

  var task = mockTask({ done: true, createdAt: new Date() });
  var component = this.subject({ content: task });
  var $taskDate = this.$().find('.task-date');

  equal($taskDate.length, 1);
  equal(Ember.$.trim($taskDate.text()), 'created a few seconds ago');
});

test('it sends editStart to targetObject action on edit start', function() {
  var task         = mockTask();
  var targetObject = Ember.Object.create({
    didStartTaskEdit: function(editedTask) {
      ok(true, 'Did send action');
      equal(editedTask, task, 'Edited task is passed as action param');
    }
  });
  var component    = this.subject({
    content: task,
    editStart: 'didStartTaskEdit',
    targetObject: targetObject
  });

  component.send('editStart');
});

test('it sends editEnd to targetObject action on edit start', function() {
  var task         = mockTask();
  var targetObject = Ember.Object.create({
    didEndTaskEdit: function(editedTask) {
      ok(true, 'Did send action');
      equal(editedTask, task, 'Edited task is passed as action param');
    }
  });
  var component    = this.subject({
    content: task,
    editEnd: 'didEndTaskEdit',
    targetObject: targetObject
  });

  component.send('editEnd');
});

test('has locked class when task is locked by another viewer', function() {
  var task = mockTask({
    isLocked: true,
    locker: '12345',
    isLocker: function() {
      return false;
    }
  });
  var component = this.subject({ content: task, viewer: '12345' });

  ok(this.$().hasClass('task-locked'));
});

test('disable editing when task is locked', function() {
  var task = mockTask({
    isLocked: true,
    locker: '12345',
    isLocker: function() {
      return false;
    }
  });
  var component = this.subject({ content: task, viewer: '12345' });

  component.send('editStart');

  equal(this.$().find('.task-form').length, 0);
});

test('sets isEditing on init when task is locked by viewer', function() {
  var task = mockTask({
    isLocked: true,
    locker: '12345',
    isLocker: function() {
      return true;
    }
  });
  var component = this.subject({ content: task, viewer: '12345' });

  ok(component.get('isEditing'), 'set isEditing property to true');
});

test('it sends delete to targetObject on delete', function() {
  expect(2);

  var task         = mockTask();
  var targetObject = Ember.Object.create({
    deleteTask: function(deletedTask) {
      ok(true, 'Did send action');
      equal(deletedTask, task, 'Deleted task is passed as action param');
    }
  });
  var component    = this.subject({
    content: task,
    delete: 'deleteTask',
    targetObject: targetObject
  });

  component.send('delete');
});

test('it sends done to targetObject on done', function() {
  expect(2);

  var task         = mockTask();
  var targetObject = Ember.Object.create({
    doneTask: function(doneTask) {
      ok(true, 'Did send action');
      equal(doneTask, task, 'Done task is passed as action param');
    }
  });
  var component    = this.subject({
    content: task,
    done: 'doneTask',
    targetObject: targetObject
  });

  component.send('done');
});
