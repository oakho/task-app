import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['task-form'],

  // This allows actions to bubble up to parent view
  target: function() {
    return this.get('parentView');
  }.property('parentView'),

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
  keyUp: function(e) {
    // Catch ESC keyup
    if(e.keyCode === 27) {
      this.send('cancel');
    }
  },

  keyPress: function(e) {
    // Catch Enter keypress and prevent new line insertion
    if(e.keyCode === 13) {
      e.preventDefault();
      this.send('submit');
    }
  },

  actions: {
    submit: function() {
      var self = this;

      this.get('content').save().then(function(task) {
        self.sendAction('submit', task);
        self.send('editEnd');
      });
    },

    cancel: function() {
      this.get('content').rollback();
      this.sendAction('cancel', this.get('content'));
      this.send('editEnd');
    }
  }
});
