import {
  moduleForComponent,
  test
} from 'ember-qunit';

import Ember from 'ember';
import mockTask from '../../helpers/mock-task';

moduleForComponent('task-show', 'TaskShowComponent', {
  // specify the other units that are required for this test
  needs: ['component:task-form', 'component:task-date', 'template:components/task-date']
});

test('it renders', function() {
  expect(3);

  var task = mockTask();

  // creates the component instance
  var component = this.subject({ content: task });
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');

  ok(component.$().hasClass('task'));
});

test('tasks label property is bound', function() {
  var task = mockTask({ label: 'TotoBolo' });
  var component = this.subject({ content: task });

  equal(this.$().find('.task-label').text(), 'TotoBolo');
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

test('displays task-form while editing', function() {
  expect(2);

  var task = mockTask({ label: 'TotoBolo' });
  var component = this.subject({ content: task });

  Ember.run(function() {
    component.set('isEditing', true);
  });

  equal(this.$().find('.task-form').length, 1);
  equal(this.$().find('.task-content').length, 0);
});

test('has editing class while editing', function() {
  var task = mockTask();
  var component = this.subject({ content: task, isEditing: true });

  ok(this.$().hasClass('task-editing'));
});

test('has done class when task is done', function() {
  var task = mockTask({ done: true });
  var component = this.subject({ content: task });

  ok(this.$().hasClass('task-done'));
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
