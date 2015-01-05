import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['task', 'task-form'],
  classNameBindings: [
    'isEditing:task-editing',
    'content.done:task-done',
    'isLocked:task-locked'
  ],

  content: null,
  viewer: null,

  // Textarea properties
  maxlength: 140,
  placeholder: null,

  isEditing: function() {
    var task = this.get('content');
    return task.isLocker(this.get('viewer'));
  }.property('content', 'viewer'),

  isLocked: function() {
    var task = this.get('content');
    return task && task.get('isLocked') && !task.isLocker(this.get('viewer'));
  }.property('content.isLocked', 'content.locker'),

  // Template properties
  privateInputId: function() {
    return 'task-private-input-'+ this.get('content.id');
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
      e.preventDefault(); // Prevents new line insertion
      this.send('submit');
    }
  }.on('keyPress'),

  catchTextAreaFocusIn: function(e) {
    if(e.target === this.$().find('.task-label-textarea')[0]) {
      this.send('editStart');
    }
  }.on('focusIn'),

  send: function() {
    // Prevents any action to be sent while task is locked
    if(!this.get('isLocked')) {
      this._super.apply(this, arguments);
    }
  },

  actions: {
    editStart: function() {
      if(!this.get('isEditing')) {
        this.set('isEditing', true);
        this.sendAction('editStart', this.get('content'));
      }
    },
    editEnd: function() {
      this.set('isEditing', false);
      this.sendAction('editEnd', this.get('content'));
    },
    submit: function() {
      this.sendAction('submit', this.get('content'));
      this.send('editEnd');
    },
    cancel: function() {
      this.sendAction('cancel', this.get('content'));
      this.send('editEnd');
    },
    done: function() {
      this.sendAction('done', this.get('content'));
    },
    delete: function() {
      this.sendAction('delete', this.get('content'));
    }
  }
});
