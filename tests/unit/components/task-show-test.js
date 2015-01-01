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

  // creates the component instance
  var component = this.subject();
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

test('start task edit on label click', function() {
  var task = mockTask({ label: 'TotoBolo' });
  var component = this.subject({ content: task });

  this.$().find('.task-label').click();

  equal(component.get('isEditing'), true);
});

test('displays task-form while editing', function() {
  expect(2);

  var task = mockTask({ label: 'TotoBolo' });
  var component = this.subject({ content: task });

  Ember.run(function() {
    component.send('start');
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
