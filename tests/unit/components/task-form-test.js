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

  component.trigger('focusIn');
  component.trigger('keyUp', { keyCode: 27 });
});
