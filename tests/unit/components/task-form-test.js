import {
  moduleForComponent,
  test
} from 'ember-qunit';

import Ember from 'ember';
import mockTask from '../../helpers/mock-task';

moduleForComponent('task-form', 'TaskFormComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function() {
  expect(3);

  // creates the component instance
  var component = this.subject();
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

test('tasks private property is bound to checkbox', function() {
  var task      = mockTask();
  var component = this.subject({ content: task });

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

test('tasks done property is bound to checkbox', function() {
  var task      = mockTask();
  var component = this.subject({ content: task });

  Ember.run(function() {
    task.set('done', true);
  });

  equal(this.$().find('.task-done-input').prop('checked'), true);
});

test('doneInputId properly defined', function() {
  var task      = mockTask();
  var component = this.subject({ content: task });

  equal(component.get('doneInputId'), 'task-done-input-'+ task.get('id'));
});

test('handles label max length', function() {
  expect(2);

  var task      = mockTask();
  var component = this.subject({ content: task });

  equal(component.get('remainingCharacters'), 140);
  task.set('label', 'TotoBolo');
  equal(component.get('remainingCharacters'), 132);
});

test('displays remaining label chararacters', function() {
  expect(3);

  var task                 = mockTask();
  var component            = this.subject({ content: task });
  var $remainingCharacters = this.$().find('.task-remaining_characters');

  ok(!!$remainingCharacters);
  equal($.trim($remainingCharacters.text()), '140');

  Ember.run(function() {
    task.set('label', 'TotoBolo');
  });

  equal($.trim($remainingCharacters.text()), '132');
});

test('has a cancel button', function() {
  var task      = mockTask();
  var component = this.subject({ content: task });

  equal(this.$().find('.task-cancel-button').length, 1);
});

test('has a save button', function() {
  var task      = mockTask();
  var component = this.subject({ content: task });

  equal(this.$().find('.task-save-button').length, 1);
});

test('save task and send action on textarea enter keypress', function() {
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

  var task         = mockTask({
    rollback: function() {
      ok(true, 'Did call rollback');
    }
  });
  var targetObject = Ember.Object.create({
    didCancelTaskUpdate: function() {
      ok(true, 'Did send cancel action');
    }
  });
  var component    = this.subject({
    content: task,
    cancel: 'didCancelTaskUpdate',
    targetObject: targetObject
  });

  component.trigger('focusIn');
  component.trigger('keyUp', { keyCode: 27 });
});

test('send start action on focus in', function() {
  expect(2);

  var task         = mockTask();
  var targetObject = Ember.Object.create({
    didStartTaskEdit: function(editedTask) {
      ok(true, 'Did send action');
      equal(editedTask, task, 'Edited task is passed as action param');
    }
  });
  var component    = this.subject({
    content: task,
    start: 'didStartTaskEdit',
    targetObject: targetObject
  });

  component.trigger('focusIn');
});

test('start action sets isEditing property to true', function() {
  var task      = mockTask();
  var component = this.subject({ content: task });

  component.send('start');
  equal(component.get('isEditing'), true);
});

test('send end action on cancel and submit', function() {
  expect(4);

  var task         = mockTask();
  var targetObject = Ember.Object.create({
    didEndTaskEdit: function(editedTask) {
      ok(true, 'Did send action');
      equal(editedTask, task, 'Edited task is passed as action param');
    }
  });
  var component    = this.subject({
    content: task,
    end: 'didEndTaskEdit',
    targetObject: targetObject
  });

  component.send('cancel');
  component.send('submit');
});

test('end action sets isEditing property to false', function() {
  var task      = mockTask();
  var component = this.subject({ content: task });

  component.send('start');
  component.send('end');

  equal(component.get('isEditing'), false);
});
