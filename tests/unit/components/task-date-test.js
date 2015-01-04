import {
  moduleForComponent,
  test
} from 'ember-qunit';

import Ember from 'ember';

moduleForComponent('task-date', 'TaskDateComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function() {
  expect(4);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');

  ok(component.$().hasClass('task-date'));
  ok(component.$().is('span'));
});

test('formattedText is formatted according createdAt and createdText properties', function() {
  var createdAt = new Date();
  var component = this.subject({
    createdAt: createdAt,
    createdText: 'created %@'
  });

  equal(component.get('formattedText'), 'created %@'.fmt(moment(createdAt).fromNow()));
});

test('formattedText is formatted according updatedAt and updatedText properties when provided', function() {
  var createdAt = new Date(), updatedAt = new Date();
  var component = this.subject({
    createdAt: createdAt,
    createdText: 'created %@',
    updatedAt: updatedAt,
    updatedText: 'edited %@'
  });

  equal(component.get('formattedText'), 'edited %@'.fmt(moment(createdAt).fromNow()));
});

test('displays formattedText', function() {
  var createdAt = new Date();
  var component = this.subject({
    createdAt: createdAt,
    createdText: 'created %@'
  });

  equal(Ember.$.trim(this.$().text()), component.get('formattedText'));
});
