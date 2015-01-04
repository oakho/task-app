import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['task-form'],

  // This allows actions to bubble up to parent view
  target: Ember.computed.alias('parentView'),

  content: null,

  // Textarea properties
  maxlength: 140,
  placeholder: null,
  autofocus: false,

  // Template properties
  privateInputId: function() {
    return 'task-private-input-'+ this.get('content.id');
  }.property('content.id'),

  doneInputId: function() {
    return 'task-done-input-'+ this.get('content.id');
  }.property('content.id'),

  remainingCharacters: function() {
    return this.get('maxlength') - this.get('content.label.length');
  }.property('content.label'),

  // DOM events
  catchEscape: function(e) {
    if(e.keyCode === 27) {
      this.send('cancel');
    }
  }.on('keyUp'),

  catchEnter: function(e) {
    if(e.keyCode === 13) {
      // prevent new line insertion
      e.preventDefault();
      this.send('submit');
    }
  }.on('keyPress'),

  actions: {
    submit: function() {
      this.sendAction('submit', this.get('content'));
      this.send('editEnd');
    },

    cancel: function() {
      this.sendAction('cancel', this.get('content'));
      this.send('editEnd');
    }
  }
});
